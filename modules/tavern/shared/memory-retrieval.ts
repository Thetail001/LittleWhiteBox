import type {
    XbTavernContext,
    XbTavernMemoryContext,
} from './message-assembler';
import { extensionFolderPath } from '../../../core/constants.js';
import * as stopwordsBase from '../../story-summary/vector/utils/stopwords-base.js';
import * as stopwordsPatch from '../../story-summary/vector/utils/stopwords-patch.js';
import {
    listTavernEpisodeSummaries,
    listTavernTurnSummaries,
    type TavernEpisodeSummaryRecord,
    type TavernTurnSummaryRecord,
} from './session-db';

export interface XbTavernMemorySelectionInput {
    episodeSummaries?: TavernEpisodeSummaryRecord[];
    turnSummaries?: TavernTurnSummaryRecord[];
    queryText?: string;
    ignoredTerms?: string[];
    recentEpisodeCount?: number;
    recentTurnCount?: number;
}

interface MemoryDocument {
    id: string;
    text: string;
    tokens: Set<string>;
}

type JiebaModule = {
    default?: (options?: Record<string, unknown>) => Promise<unknown>;
    cut?: (text: string, hmm?: boolean) => unknown[];
};

type TinySegmenterInstance = {
    segment: (text: string) => string[];
};

const STOP_WORDS = new Set<string>([
    ...(((stopwordsBase as { BASE_STOP_WORDS?: string[] }).BASE_STOP_WORDS) || []),
    ...(((stopwordsPatch as { DOMAIN_STOP_WORDS?: string[] }).DOMAIN_STOP_WORDS) || []),
].map((word) => normalizeText(word)).filter(Boolean));
const KEEP_WORDS = new Set<string>((((stopwordsPatch as { KEEP_WORDS?: string[] }).KEEP_WORDS) || [])
    .map((word) => normalizeText(word))
    .filter(Boolean));
let jiebaCut: ((text: string, hmm?: boolean) => unknown[]) | null = null;
let tinySegmenter: TinySegmenterInstance | null = null;
let tokenizerPreload: Promise<boolean> | null = null;

function normalizeText(value: unknown = ''): string {
    return String(value || '')
        .normalize('NFKC')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
}

function compactText(value: unknown = ''): string {
    return normalizeText(value).replace(/\s+/g, '');
}

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeTerm(value: unknown = ''): string {
    return compactText(value);
}

function normalizeIgnoredTerms(values: unknown[] = []): Set<string> {
    return new Set(values
        .map((value) => normalizeTerm(value))
        .filter((value) => value.length >= 2));
}

function stripIgnoredTerms(text: string, ignoredTerms: Set<string>): string {
    let result = String(text || '');
    ignoredTerms.forEach((term) => {
        if (!term) {return;}
        result = result.replace(new RegExp(escapeRegex(term), 'gi'), ' ');
    });
    return result;
}

function stripSpeakerPrefixes(text: string, names: string[] = []): string {
    const labels = [
        ...names,
        'user',
        'assistant',
        '用户',
        '角色',
        '玩家',
        '旁白',
    ].map((name) => String(name || '').trim()).filter(Boolean);
    if (!labels.length) {return text;}
    const labelPattern = labels.map(escapeRegex).join('|');
    return String(text || '').split(/\r?\n/).map((line) => (
        line.replace(new RegExp(`^\\s*(?:${labelPattern})\\s*[:：]\\s*`, 'i'), '')
    )).join('\n');
}

function cleanMemoryText(value: unknown = ''): string {
    return String(value || '')
        .replace(/\[tts:[^\]]*]/gi, ' ')
        .replace(/<state>[\s\S]*?<\/state>/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function isKana(code: number): boolean {
    return (code >= 0x3040 && code <= 0x309F)
        || (code >= 0x30A0 && code <= 0x30FF)
        || (code >= 0x31F0 && code <= 0x31FF)
        || (code >= 0xFF65 && code <= 0xFF9F);
}

function isCjk(code: number): boolean {
    return (code >= 0x4E00 && code <= 0x9FFF)
        || (code >= 0x3400 && code <= 0x4DBF)
        || (code >= 0xF900 && code <= 0xFAFF)
        || (code >= 0x20000 && code <= 0x2A6DF);
}

function isAsian(code: number): boolean {
    return isCjk(code) || isKana(code);
}

function isLatin(code: number): boolean {
    return (code >= 0x41 && code <= 0x5A)
        || (code >= 0x61 && code <= 0x7A)
        || (code >= 0x30 && code <= 0x39)
        || (code >= 0xC0 && code <= 0x024F);
}

function detectAsianLanguage(text: string): 'zh' | 'ja' | 'other' {
    let kanaCount = 0;
    let cjkCount = 0;
    for (const char of text) {
        const code = char.codePointAt(0) || 0;
        if (isKana(code)) {kanaCount += 1;}
        else if (isCjk(code)) {cjkCount += 1;}
    }
    const total = kanaCount + cjkCount;
    if (!total) {return 'other';}
    return kanaCount / total > 0.3 ? 'ja' : 'zh';
}

function tokenizeLatin(text: string): string[] {
    return String(text || '')
        .split(/[\s\-_.,;:!?'"()[\]{}<>/\\|@#$%^&*+=~`]+/)
        .map((word) => normalizeText(word))
        .filter((word) => word.length >= 3);
}

function tokenizeAsianFallback(text: string): string[] {
    const tokens: string[] = [];
    const parts = String(text || '').split(/[\s，。！？、；：""''（）【】《》…—\-,.!?;:'"()[\]{}<>/\\|@#$%^&*+=~`]+/);
    parts.forEach((part) => {
        const trimmed = normalizeText(part);
        if (!trimmed) {return;}
        if (trimmed.length >= 2 && trimmed.length <= 6) {
            tokens.push(trimmed);
            return;
        }
        for (let index = 0; index <= trimmed.length - 4; index += 2) {
            tokens.push(trimmed.slice(index, index + 4));
        }
        tokens.push(trimmed.slice(0, 6));
    });
    return tokens;
}

function tokenizeAsian(text: string): string[] {
    if (detectAsianLanguage(text) === 'ja' && tinySegmenter) {
        try {
            return tinySegmenter.segment(text)
                .map((word) => normalizeText(word))
                .filter((word) => word.length >= 2);
        } catch {
            return tokenizeAsianFallback(text);
        }
    }
    if (jiebaCut) {
        try {
            return Array.from(jiebaCut(text, true))
                .map((word) => normalizeText(word))
                .filter((word) => word.length >= 2);
        } catch {
            return tokenizeAsianFallback(text);
        }
    }
    return tokenizeAsianFallback(text);
}

function tokenizeByScript(text: string): string[] {
    const tokens: string[] = [];
    let currentType: 'asian' | 'latin' | 'other' | null = null;
    let current = '';
    const flush = () => {
        if (!current) {return;}
        if (currentType === 'asian') {tokens.push(...tokenizeAsian(current));}
        else if (currentType === 'latin') {tokens.push(...tokenizeLatin(current));}
        current = '';
    };

    for (const char of String(text || '')) {
        const code = char.codePointAt(0) || 0;
        const type = isAsian(code) ? 'asian' : isLatin(code) ? 'latin' : 'other';
        if (type !== currentType) {
            flush();
            currentType = type;
        }
        if (type !== 'other') {current += char;}
    }
    flush();
    return tokens;
}

function tokenizeForMemoryIndex(text: string): string[] {
    const seen = new Set<string>();
    const result: string[] = [];
    tokenizeByScript(text).forEach((token) => {
        const normalized = normalizeText(token);
        if (!normalized || normalized.length < 2) {return;}
        if (STOP_WORDS.has(normalized) && !KEEP_WORDS.has(normalized)) {return;}
        if (/^[\s\x00-\x1F\p{P}\p{S}]+$/u.test(normalized)) {return;}
        if (seen.has(normalized)) {return;}
        seen.add(normalized);
        result.push(normalized);
    });
    return result;
}

export async function preloadXbTavernMemoryTokenizer(): Promise<boolean> {
    if (typeof window === 'undefined') {return false;}
    if (tokenizerPreload) {return await tokenizerPreload;}
    tokenizerPreload = (async () => {
        let loaded = false;
        try {
            // eslint-disable-next-line no-unsanitized/method
            const tinyModule = await import(
                /* @vite-ignore */
                `/${extensionFolderPath}/libs/tiny-segmenter.js`
            ) as { TinySegmenter?: new () => TinySegmenterInstance; default?: new () => TinySegmenterInstance };
            const TinySegmenter = tinyModule.TinySegmenter || tinyModule.default;
            if (TinySegmenter) {
                tinySegmenter = new TinySegmenter();
                loaded = true;
            }
        } catch {
            tinySegmenter = null;
        }
        try {
            const wasmPath = `/${extensionFolderPath}/libs/jieba-wasm/jieba_rs_wasm_bg.wasm`;
            // eslint-disable-next-line no-unsanitized/method
            const jiebaModule = await import(
                /* @vite-ignore */
                `/${extensionFolderPath}/libs/jieba-wasm/jieba_rs_wasm.js`
            ) as JiebaModule;
            if (typeof jiebaModule.default === 'function') {
                await jiebaModule.default({ module_or_path: wasmPath });
            }
            if (typeof jiebaModule.cut === 'function') {
                jiebaCut = jiebaModule.cut;
                loaded = true;
            }
        } catch {
            jiebaCut = null;
        }
        return loaded;
    })();
    return await tokenizerPreload;
}

function addCjkSubterms(tokens: Set<string>, text: string): void {
    const normalized = compactText(text);
    const runs = normalized.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]{2,}/gu) || [];
    runs.forEach((run) => {
        if (run.length <= 8) {tokens.add(run);}
        for (let size = 2; size <= 4; size += 1) {
            if (run.length < size) {continue;}
            for (let index = 0; index <= run.length - size; index += 1) {
                tokens.add(run.slice(index, index + size));
            }
        }
    });
}

function tokenizeMemoryText(value: unknown = '', ignoredTerms: Set<string> = new Set()): string[] {
    const cleaned = stripIgnoredTerms(cleanMemoryText(value), ignoredTerms);
    const tokens = new Set<string>();

    if (typeof window !== 'undefined' && !tokenizerPreload) {
        void preloadXbTavernMemoryTokenizer();
    }
    tokenizeForMemoryIndex(cleaned)
        .map((token) => normalizeTerm(token))
        .filter(Boolean)
        .forEach((token) => tokens.add(token));
    addCjkSubterms(tokens, cleaned);

    return [...tokens].filter((token) => {
        if (token.length < 2) {return false;}
        for (const ignored of ignoredTerms) {
            if (token === ignored || token.includes(ignored) || ignored.includes(token)) {
                return false;
            }
        }
        return true;
    });
}

function buildMemoryDocuments<T extends { id: string }>(records: T[], getText: (record: T) => string): MemoryDocument[] {
    return records.map((record) => {
        const text = getText(record);
        return {
            id: record.id,
            text,
            tokens: new Set(tokenizeMemoryText(text)),
        };
    });
}

function buildIdf(documents: MemoryDocument[]): Map<string, number> {
    const df = new Map<string, number>();
    documents.forEach((document) => {
        document.tokens.forEach((token) => {
            df.set(token, (df.get(token) || 0) + 1);
        });
    });
    const total = Math.max(1, documents.length);
    const idf = new Map<string, number>();
    df.forEach((count, token) => {
        idf.set(token, Math.log((total + 1) / (count + 1)) + 1);
    });
    return idf;
}

function tokenWeight(token: string, idf: Map<string, number>): number {
    const lengthWeight = token.length <= 2 ? 0.55 : token.length === 3 ? 0.9 : 1.25;
    return lengthWeight * (idf.get(token) || 1);
}

function scoreDocument(document: MemoryDocument | undefined, queryTokens: string[] = [], idf: Map<string, number>): number {
    if (!document) {return 0;}
    if (!queryTokens.length) {return 0;}
    return queryTokens.reduce((score, token) => (
        document.tokens.has(token) ? score + tokenWeight(token, idf) : score
    ), 0);
}

function episodeText(episode: TavernEpisodeSummaryRecord): string {
    return [
        episode.title,
        episode.summary,
        ...(episode.keyChanges || []),
        ...(episode.unresolved || []),
    ].join('\n');
}

function turnText(summary: TavernTurnSummaryRecord): string {
    return [
        summary.summary,
        summary.characterState,
        summary.relationshipChange,
        summary.locationTimeItems,
        ...(summary.hooks || []),
        ...(summary.tags || []),
    ].join('\n');
}

function byTurn(left: TavernTurnSummaryRecord, right: TavernTurnSummaryRecord): number {
    return (Number(left.turn) || 0) - (Number(right.turn) || 0)
        || (Number(left.userOrder) || 0) - (Number(right.userOrder) || 0);
}

function byEpisode(left: TavernEpisodeSummaryRecord, right: TavernEpisodeSummaryRecord): number {
    return (Number(left.startTurn) || 0) - (Number(right.startTurn) || 0)
        || (Number(left.updatedAt) || 0) - (Number(right.updatedAt) || 0);
}

function sliceRecent<T>(items: T[], count: number): T[] {
    if (count <= 0) {return [];}
    return items.slice(-count);
}

export function buildXbTavernMemoryIgnoredTerms(context: XbTavernContext = {}): string[] {
    return [
        context.character?.name,
        context.user?.name,
    ].map((value) => String(value || '').trim()).filter((value) => value.length >= 2);
}

export function buildXbTavernMemoryQuery(context: XbTavernContext = {}, currentUserMessage = ''): string {
    const history = Array.isArray(context.history) ? context.history.slice(-8) : [];
    const names = buildXbTavernMemoryIgnoredTerms(context);
    const cleanLine = (value: unknown) => stripSpeakerPrefixes(cleanMemoryText(value), names);
    return [
        cleanLine(currentUserMessage),
        ...history.map((message) => cleanLine(message.content || message.mes || message.message || '')),
    ].filter(Boolean).join('\n');
}

export function selectXbTavernMemoryContext(input: XbTavernMemorySelectionInput = {}): XbTavernMemoryContext {
    const episodes = [...(input.episodeSummaries || [])].sort(byEpisode);
    const turns = [...(input.turnSummaries || [])].sort(byTurn);
    const recentEpisodeCount = Math.max(0, Number(input.recentEpisodeCount ?? 4) || 0);
    const recentTurnCount = Math.max(0, Number(input.recentTurnCount ?? 10) || 0);
    const ignoredTerms = normalizeIgnoredTerms(input.ignoredTerms || []);
    const queryTokens = tokenizeMemoryText(input.queryText, ignoredTerms);
    const episodeDocuments = buildMemoryDocuments(
        episodes,
        (record) => episodeText(record),
    );
    const turnDocuments = buildMemoryDocuments(
        turns,
        (record) => turnText(record),
    );
    const idf = buildIdf([...episodeDocuments, ...turnDocuments]);
    const episodeDocumentById = new Map(episodeDocuments.map((document) => [document.id, document]));
    const turnDocumentById = new Map(turnDocuments.map((document) => [document.id, document]));

    const recentEpisodeIds = new Set(sliceRecent(episodes, recentEpisodeCount).map((episode) => episode.id));
    const selectedEpisodes = episodes
        .map((episode) => ({
            episode,
            score: scoreDocument(episodeDocumentById.get(episode.id), queryTokens, idf),
            hasOpenThread: (episode.unresolved || []).some((item) => normalizeText(item)),
        }))
        .filter((item) => recentEpisodeIds.has(item.episode.id) || item.score > 0 || item.hasOpenThread)
        .sort((left, right) => byEpisode(left.episode, right.episode))
        .map((item) => item.episode);

    const recentTurnIds = new Set(sliceRecent(turns, recentTurnCount).map((summary) => summary.id));
    const selectedTurns = turns
        .map((summary) => ({
            summary,
            score: scoreDocument(turnDocumentById.get(summary.id), queryTokens, idf),
        }))
        .filter((item) => recentTurnIds.has(item.summary.id) || item.score > 0)
        .sort((left, right) => byTurn(left.summary, right.summary))
        .map((item) => item.summary);

    return {
        episodeSummaries: selectedEpisodes.map((episode) => ({
            id: episode.id,
            title: episode.title,
            summary: episode.summary,
            startTurn: episode.startTurn,
            endTurn: episode.endTurn,
            keyChanges: episode.keyChanges || [],
            unresolved: episode.unresolved || [],
        })),
        turnSummaries: selectedTurns.map((summary) => ({
            id: summary.id,
            turn: summary.turn,
            summary: summary.summary,
            episodeId: summary.episodeId || '',
            userOrder: summary.userOrder,
            assistantOrder: summary.assistantOrder,
            characterState: summary.characterState || '',
            relationshipChange: summary.relationshipChange || '',
            locationTimeItems: summary.locationTimeItems || '',
            hooks: summary.hooks || [],
            tags: summary.tags || [],
        })),
    };
}

export async function retrieveXbTavernMemoryContext(input: {
    sessionId: string;
    queryText?: string;
    ignoredTerms?: string[];
}): Promise<XbTavernMemoryContext> {
    const sessionId = String(input.sessionId || '').trim();
    if (!sessionId) {return {};}
    const [episodeSummaries, turnSummaries] = await Promise.all([
        listTavernEpisodeSummaries(sessionId),
        listTavernTurnSummaries(sessionId),
    ]);
    return selectXbTavernMemoryContext({
        episodeSummaries,
        turnSummaries,
        queryText: input.queryText,
        ignoredTerms: input.ignoredTerms,
    });
}
