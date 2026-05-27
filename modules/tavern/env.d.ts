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
    providerPayload?: unknown;
}

declare module '*.js' {
    const value: unknown;
    export default value;
    export const extensionFolderPath: string;
    export function getRequestHeaders(): Record<string, string>;
    export function getContext(): Record<string, unknown>;
    export const AssistantStorage: {
        get<T = unknown>(key: string, fallback?: T): Promise<T>;
    };
    export function normalizeAgentSettings(settings: Record<string, unknown>): Record<string, unknown>;
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
    export function resolveActiveProviderConfig(
        config: Record<string, unknown>,
        options?: Record<string, unknown>,
    ): Record<string, unknown>;
}
