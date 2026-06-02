interface TavernAgentAdapterChatOptions {
    systemPrompt?: string;
    messages?: unknown[];
    tools?: unknown[];
    toolChoice?: string;
    temperature?: unknown;
    maxTokens?: unknown;
    signal?: AbortSignal;
    onStreamProgress?: (snapshot: { text?: string; thoughts?: Array<{ label?: string; text?: string }> }) => void;
}

interface TavernAgentAdapterChatResult {
    text?: string;
    thoughts?: Array<{ label?: string; text?: string }>;
    model?: string;
    provider?: string;
    finishReason?: string;
    toolCalls?: unknown[];
    providerPayload?: unknown;
}

declare module '*.js' {
    const value: unknown;
    export default value;
    export const extensionFolderPath: string;
    export function getRequestHeaders(): Record<string, string>;
    export function getContext(): Record<string, unknown>;
    export function saveSettingsDebounced(): void;
    export function getPresetManager(apiId?: string): {
        getSelectedPresetName?: () => string;
        getAllPresets?: () => string[];
        getCompletionPresetByName?: (name: string) => unknown;
        getPresetSettings?: (name?: string) => unknown;
        savePreset?: (name: string, preset?: unknown) => Promise<void>;
        findPreset?: (name: string) => unknown;
        selectPreset?: (value: unknown) => void;
    } | null;
    export const promptManager: {
        serviceSettings?: Record<string, unknown>;
        getPromptCollection?: (generationType?: string) => { collection?: unknown[] };
        saveServiceSettings?: () => Promise<void> | void;
        render?: (force?: boolean) => void;
    } | null;
    export const context_presets: Array<Record<string, unknown>>;
    export const instruct_presets: Array<Record<string, unknown>>;
    export const system_prompts: Array<Record<string, unknown>>;
    export const power_user: Record<string, Record<string, unknown>>;
    export const AssistantStorage: {
        get<T = unknown>(key: string, fallback?: T): Promise<T>;
        load(): Promise<Record<string, unknown>>;
        saveNow(options?: Record<string, unknown>): Promise<void>;
        _dirtyVersion?: number;
    };
    export const AGENT_SETTINGS_CONFIG_VERSION: number;
    export function normalizeAgentSettings(settings: Record<string, unknown>): Record<string, unknown>;
    export function normalizeAgentConfig(settings: Record<string, unknown>): Record<string, unknown>;
    export function normalizeJsApiPermission(value: unknown): string;
    export function normalizePresetName(value: unknown): string;
    export function createFirstPartyIframeOverlay(options: {
        overlayId: string;
        iframeId: string;
        htmlPath: string;
        version?: string;
    }): Promise<HTMLElement>;
    export function loadFirstPartyIframeCacheKey(path: string): Promise<string>;
    export function isTrustedMessage(event: MessageEvent, iframe: HTMLIFrameElement | null, source: string): boolean;
    export function postToIframe(iframe: HTMLIFrameElement, message: unknown, source: string): boolean;
    export function createAgentAdapter(
        config: Record<string, unknown>,
        options?: Record<string, unknown>,
    ): { chat(options: TavernAgentAdapterChatOptions): Promise<TavernAgentAdapterChatResult> };
    export function setHostChatCompletionsRequestHeadersProvider(
        provider: null | (() => Record<string, unknown> | Promise<Record<string, unknown>>),
    ): void;
    export function resolveActiveProviderConfig(
        config: Record<string, unknown>,
        options?: Record<string, unknown>,
    ): Record<string, unknown>;
    export function applyTextEdits(content: string, edits: unknown): {
        ok: boolean;
        content: string;
        appliedCount?: number;
        warning?: string;
        results?: unknown;
    };
    export function buildProviderAssistantToolCallMessage(
        result?: Record<string, unknown>,
        toolCalls?: unknown[],
        options?: Record<string, unknown>,
    ): Record<string, unknown>;
    export function hasVisibleText(text: unknown): boolean;
    export function resolveResultToolCalls(
        result?: Record<string, unknown>,
        providerConfig?: Record<string, unknown>,
        options?: Record<string, unknown>,
    ): Array<{ id: string; name: string; arguments: string }>;
    export function renderMarkdownToHtml(text: string): string;
    export function enhanceMarkdownContent(rootNode: ParentNode, options?: Record<string, unknown>): ParentNode;
    export function createAgentSettingsPanel(deps?: Record<string, unknown>): {
        getActiveProviderConfig(options?: Record<string, unknown>): Record<string, unknown>;
        syncConfigToForm(root: ParentNode): void;
        bindSettingsPanelEvents(root: ParentNode): void;
    };
    export function buildAgentSettingsPanelMarkup(options?: Record<string, unknown>): string;
}
