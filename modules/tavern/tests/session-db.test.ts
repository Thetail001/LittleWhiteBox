import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';

import db, {
    appendTavernMessage,
    createTavernSession,
    deleteTavernMessages,
    deriveAndActivateDefaultTavernPreset,
    getActiveTavernPresetId,
    getSelectedTavernSessionId,
    getTavernSession,
    listTavernEpisodeSummaries,
    listTavernManagerRuns,
    listUserTavernPresets,
    listTavernMessages,
    listTavernTurnSummaries,
    markTavernMemoryStaleFromOrder,
    loadActiveTavernPreset,
    mergeWorldEntryStates,
    normalizeTavernSessionState,
    replaceTavernSessionState,
    saveTavernPreset,
    setActiveTavernPresetId,
    updateTavernMessage,
    updateTavernManagerRun,
    updateTavernSessionState,
    upsertTavernEpisodeSummary,
    upsertTavernTurnSummary,
    createTavernManagerRun,
} from '../shared/session-db';
import { DEFAULT_XB_TAVERN_PRESET_ID, createDefaultXbTavernPreset } from '../shared/presets';
import { buildXbTavernMessages, createXbTavernBuildSnapshot } from '../shared/message-assembler';
import {
    parseXbTavernManagerResult,
    runXbTavernManagerAfterTurn,
} from '../app-src/runtime/manager';

test('tavern session db stores independent sessions and messages', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({
        title: 'Aster test',
        characterId: '0',
        characterName: 'Aster',
        contextSnapshot: { character: { id: '0', name: 'Aster' } },
        presetId: 'preset-1',
        presetName: 'Preset One',
    });
    const buildResult = buildXbTavernMessages({
        character: { id: '0', name: 'Aster' },
    }, {
        id: 'preset-1',
        name: 'Preset One',
        systemPrompt: 'Top',
        toolPrompt: 'Tools',
    }, {
        currentUserMessage: 'Hello.',
    });
    const buildSnapshot = createXbTavernBuildSnapshot({ character: { id: '0', name: 'Aster' } }, { id: 'preset-1', name: 'Preset One' }, buildResult);
    await appendTavernMessage(session.id, {
        role: 'user',
        content: 'Hello.',
        buildSnapshot,
        presetId: 'preset-1',
        presetName: 'Preset One',
    });
    await appendTavernMessage(session.id, {
        role: 'assistant',
        content: 'Hi.',
        requestSnapshot: { messageCount: buildResult.messages.length },
    });

    assert.equal(await getSelectedTavernSessionId(), session.id);
    const messages = await listTavernMessages(session.id);
    assert.deepEqual(messages.map((message) => message.role), ['user', 'assistant']);
    assert.equal(messages[0]?.buildSnapshot?.presetId, 'preset-1');
    assert.deepEqual(messages[1]?.requestSnapshot, { messageCount: buildResult.messages.length });
});

test('tavern session db stores only cloneable snapshots from runtime inputs', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({
        title: 'Clone guard',
        contextSnapshot: {
            character: { id: '1', name: 'Nia' },
        },
        state: {
            turn: 1,
            helper: () => 'not cloneable',
        },
    });

    await appendTavernMessage(session.id, {
        role: 'assistant',
        content: 'OK.',
        providerPayload: {
            text: 'OK.',
            helper: () => 'not cloneable',
        },
        requestSnapshot: {
            messageCount: 1,
            helper: () => 'not cloneable',
        },
    });

    const messages = await listTavernMessages(session.id);
    assert.equal(messages.length, 1);
    assert.deepEqual(messages[0]?.providerPayload, { text: 'OK.' });
    assert.deepEqual(messages[0]?.requestSnapshot, { messageCount: 1 });
});

test('tavern session db updates and deletes message records by order', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({ title: 'Edit messages' });
    await appendTavernMessage(session.id, { role: 'user', content: 'Original user.' });
    await appendTavernMessage(session.id, { role: 'assistant', content: 'Original assistant.' });
    await appendTavernMessage(session.id, { role: 'user', content: 'Next user.' });

    const updated = await updateTavernMessage(session.id, 0, { content: 'Edited user.' });
    assert.equal(updated?.content, 'Edited user.');

    assert.equal(await deleteTavernMessages(session.id, [1]), 1);
    const messages = await listTavernMessages(session.id);
    assert.deepEqual(messages.map((message) => `${message.order}:${message.content}`), [
        '0:Edited user.',
        '2:Next user.',
    ]);
});

test('tavern preset db derives, activates, edits and resets presets', async () => {
    await db.delete();
    await db.open();

    assert.equal(await getActiveTavernPresetId(), DEFAULT_XB_TAVERN_PRESET_ID);
    assert.equal((await loadActiveTavernPreset()).id, DEFAULT_XB_TAVERN_PRESET_ID);

    const derived = await deriveAndActivateDefaultTavernPreset('我的测试预设');
    assert.notEqual(derived.id, DEFAULT_XB_TAVERN_PRESET_ID);
    assert.equal(await getActiveTavernPresetId(), derived.id);
    assert.equal((await listUserTavernPresets()).length, 1);

    const edited = {
        ...derived.preset,
        name: '改过的预设',
        sections: [
            ...(derived.preset.sections || []),
            {
                id: 'custom',
                label: '自定义',
                placement: 'afterHistory' as const,
                role: 'system' as const,
                content: '只存在用户预设里。',
            },
        ],
    };
    await saveTavernPreset(edited);
    assert.equal((await loadActiveTavernPreset()).name, '改过的预设');

    await setActiveTavernPresetId(DEFAULT_XB_TAVERN_PRESET_ID);
    assert.deepEqual(await loadActiveTavernPreset(), createDefaultXbTavernPreset());
});

test('tavern session state stores turn and merges world entry states', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({
        title: 'Runtime state',
        state: {
            turn: 2,
            worldEntryStates: {
                'Lore\u0000gate': { stickyUntilTurn: 4 },
            },
        },
    });

    assert.deepEqual(normalizeTavernSessionState(session.state), {
        turn: 2,
        worldEntryStates: {
            'Lore\u0000gate': { stickyUntilTurn: 4 },
        },
    });

    await updateTavernSessionState(session.id, {
        turn: 3,
        worldEntryStates: {
            'Lore\u0000gate': { cooldownUntilTurn: 5 },
            'Lore\u0000new': { delayUntilTurn: 6 },
        },
        lastProvider: 'fake-provider',
    });

    const updated = await getTavernSession(session.id);
    assert.equal(updated?.state?.turn, 3);
    assert.deepEqual(updated?.state?.worldEntryStates, {
        'Lore\u0000gate': { stickyUntilTurn: 4, cooldownUntilTurn: 5 },
        'Lore\u0000new': { delayUntilTurn: 6 },
    });
    assert.equal(updated?.state?.lastProvider, 'fake-provider');

    assert.deepEqual(mergeWorldEntryStates({
        a: { stickyUntilTurn: 1 },
    }, {
        a: { cooldownUntilTurn: 2 },
    }), {
        a: { stickyUntilTurn: 1, cooldownUntilTurn: 2 },
    });

    await replaceTavernSessionState(session.id, {
        turn: 1,
        worldEntryStates: {
            'Lore\u0000fresh': { stickyUntilTurn: 2 },
        },
        lastProvider: '',
    });
    const replaced = await getTavernSession(session.id);
    assert.equal(replaced?.state?.turn, 1);
    assert.deepEqual(replaced?.state?.worldEntryStates, {
        'Lore\u0000fresh': { stickyUntilTurn: 2 },
    });
    assert.equal(replaced?.state?.lastProvider, '');
});

test('tavern memory db stores turn summaries, episodes, and manager runs', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({ title: 'Memory' });
    const turnSummary = await upsertTavernTurnSummary({
        sessionId: session.id,
        turn: 1,
        userOrder: 0,
        assistantOrder: 1,
        summary: '两人确认了共同目标。',
        hooks: ['下一步去码头'],
        tags: ['目标'],
    });
    const episode = await upsertTavernEpisodeSummary({
        sessionId: session.id,
        title: '码头前夜',
        summary: '阶段围绕出发前的试探。',
        startTurn: 1,
        endTurn: 1,
        turnSummaryIds: [turnSummary.id],
        keyChanges: ['关系缓和'],
    });
    const run = await createTavernManagerRun({
        sessionId: session.id,
        turn: 1,
        userOrder: 0,
        assistantOrder: 1,
        status: 'queued',
    });
    await updateTavernManagerRun(run.id, {
        status: 'completed',
        parsedAction: 'create_new_episode',
    });

    assert.equal((await listTavernTurnSummaries(session.id))[0]?.episodeId, episode.id);
    assert.equal((await listTavernEpisodeSummaries(session.id))[0]?.title, '码头前夜');
    assert.equal((await listTavernManagerRuns(session.id))[0]?.status, 'completed');

    assert.equal(await markTavernMemoryStaleFromOrder(session.id, 0), 1);
    assert.equal((await listTavernTurnSummaries(session.id)).length, 0);
    assert.equal((await listTavernTurnSummaries(session.id, { includeStale: true }))[0]?.status, 'stale');
    assert.equal((await listTavernEpisodeSummaries(session.id, { includeStale: true }))[0]?.status, 'stale');
});

test('tavern manager accepts older active summaries without accepting fake ids', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({ title: 'Bounded manager' });
    const userMessage = await appendTavernMessage(session.id, { role: 'user', content: '去码头。' });
    const assistantMessage = await appendTavernMessage(session.id, { role: 'assistant', content: '她答应了。' });
    const summaries: Array<Awaited<ReturnType<typeof upsertTavernTurnSummary>>> = [];
    for (let index = 0; index < 6; index += 1) {
        summaries.push(await upsertTavernTurnSummary({
            sessionId: session.id,
            turn: index + 1,
            userOrder: 10 + index * 2,
            assistantOrder: 11 + index * 2,
            summary: `第 ${index + 1} 条摘要。`,
        }));
    }

    await runXbTavernManagerAfterTurn({
        sessionId: session.id,
        agentConfig: {},
        userMessage,
        assistantMessage,
        turn: 7,
        recentTurnSummaries: summaries,
        recentEpisodeSummaries: [],
        executeManagerOnce: async () => ({
            text: JSON.stringify({
                turnSummary: {
                    summary: '本轮决定去码头。',
                },
                episodeDecision: {
                    action: 'create_new_episode',
                    title: '码头',
                    summary: '最近几轮开始转向码头。',
                    turnSummaryIds: [summaries[0]?.id, summaries[5]?.id, 'not-real'],
                },
            }),
        }),
    });

    const episodes = await listTavernEpisodeSummaries(session.id);
    assert.equal(episodes.length, 1);
    assert.equal(episodes[0]?.turnSummaryIds.includes(summaries[0]?.id || ''), true);
    assert.equal(episodes[0]?.turnSummaryIds.includes(summaries[5]?.id || ''), true);
    assert.equal(episodes[0]?.turnSummaryIds.includes('not-real'), false);
});

test('tavern manager refuses to write memory when source messages changed', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({ title: 'Stale source' });
    const userMessage = await appendTavernMessage(session.id, { role: 'user', content: '原句。' });
    const assistantMessage = await appendTavernMessage(session.id, { role: 'assistant', content: '原回复。' });
    await updateTavernMessage(session.id, assistantMessage.order, { content: '新回复。' });

    const result = await runXbTavernManagerAfterTurn({
        sessionId: session.id,
        agentConfig: {},
        userMessage,
        assistantMessage,
        turn: 1,
        executeManagerOnce: async () => ({
            text: JSON.stringify({
                turnSummary: { summary: '不应该写入。' },
            }),
        }),
    });

    assert.equal(result.ok, false);
    assert.equal(result.error, 'manager_source_messages_changed');
    assert.equal((await listTavernTurnSummaries(session.id)).length, 0);
    assert.equal((await listTavernManagerRuns(session.id))[0]?.status, 'failed');
});

test('tavern manager keeps raw output when JSON parsing fails', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({ title: 'Bad JSON' });
    const userMessage = await appendTavernMessage(session.id, { role: 'user', content: '继续。' });
    const assistantMessage = await appendTavernMessage(session.id, { role: 'assistant', content: '她继续。' });

    const result = await runXbTavernManagerAfterTurn({
        sessionId: session.id,
        agentConfig: {},
        userMessage,
        assistantMessage,
        turn: 1,
        executeManagerOnce: async () => ({
            provider: 'fake-manager',
            model: 'memory-model',
            text: '这不是 JSON',
        }),
    });

    const runs = await listTavernManagerRuns(session.id);
    assert.equal(result.ok, false);
    assert.equal(runs[0]?.status, 'failed');
    assert.equal(runs[0]?.outputText, '这不是 JSON');
    assert.equal(runs[0]?.provider, 'fake-manager');
    assert.equal(runs[0]?.model, 'memory-model');
});

test('tavern manager append does not create hallucinated episode ids', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({ title: 'Episode guard' });
    const userMessage = await appendTavernMessage(session.id, { role: 'user', content: '继续码头线。' });
    const assistantMessage = await appendTavernMessage(session.id, { role: 'assistant', content: '她看向码头。' });
    const recentSummary = await upsertTavernTurnSummary({
        sessionId: session.id,
        turn: 1,
        userOrder: 0,
        assistantOrder: 1,
        summary: '已有摘要。',
    });
    const existingEpisode = await upsertTavernEpisodeSummary({
        sessionId: session.id,
        title: '真实阶段',
        summary: '已有阶段。',
        startTurn: 1,
        endTurn: 1,
        turnSummaryIds: [recentSummary.id],
    });

    await runXbTavernManagerAfterTurn({
        sessionId: session.id,
        agentConfig: {},
        userMessage,
        assistantMessage,
        turn: 2,
        recentTurnSummaries: [recentSummary],
        recentEpisodeSummaries: [existingEpisode],
        executeManagerOnce: async () => ({
            text: JSON.stringify({
                turnSummary: { summary: '继续同一阶段。' },
                episodeDecision: {
                    action: 'append_to_existing',
                    episodeId: 'episode-summary-not-real',
                    title: '不该创建',
                    summary: '不应创建新阶段。',
                },
            }),
        }),
    });

    const episodes = await listTavernEpisodeSummaries(session.id);
    assert.equal(episodes.length, 1);
    assert.equal(episodes[0]?.id, existingEpisode.id);
    assert.equal(episodes[0]?.title, '真实阶段');
});

test('tavern manager result parser requires a small summary', () => {
    assert.throws(() => parseXbTavernManagerResult('{}'), /manager_turn_summary_required/);
});
