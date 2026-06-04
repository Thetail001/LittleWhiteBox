import { getRequestHeaders } from '../../../../../../script.js';
import { extensionFolderPath } from '../../core/constants.js';
import { createFirstPartyIframeOverlay, loadFirstPartyIframeCacheKey } from '../../core/first-party-iframe-app.js';
import { isTrustedMessage, postToIframe } from '../../core/iframe-messaging.js';
import { buildTavernFrameConfig, saveTavernAgentConfig } from './host/agent-config.js';
import {
    getTavernChatPresetBundle,
    listTavernChatPresetBundles,
    saveTavernChatPresetBundle,
    selectTavernChatPresetBundle,
} from './host/chat-presets.js';
import {
    deleteTavernRegexScript,
    listTavernRegexScripts,
    saveTavernRegexScript,
} from './host/regex.js';
import { buildTavernContext } from './host/sillytavern-context.js';
import {
    createTavernWorldbookEntry,
    getTavernWorldbook,
    listTavernWorldbooks,
    saveTavernWorldbook,
    setTavernWorldbookActive,
} from './host/worldbooks.js';

interface PendingFrameMessage {
    type: string;
    payload: Record<string, unknown>;
}

interface TavernFacade {
    open: () => Promise<void>;
    close: () => void;
    refreshContext: (options?: Record<string, unknown>) => Promise<void>;
}

declare global {
    interface Window {
        xiaobaixTavern?: TavernFacade;
    }
}

const SOURCE_HOST = 'xb-tavern-host';
const SOURCE_APP = 'xb-tavern-app';
const OVERLAY_ID = 'xiaobaix-tavern-overlay';
const IFRAME_ID = 'xiaobaix-tavern-iframe';
const HTML_PATH = `${extensionFolderPath}/modules/tavern/tavern.html`;
const BUILD_INFO_PATH = `${extensionFolderPath}/modules/tavern/dist/tavern-build.json`;

let tavernCacheKey = '';
let frameReady = false;
let pendingMessages: PendingFrameMessage[] = [];
let messageHandlerInstalled = false;
let overlayResizeHandler: (() => void) | null = null;

async function loadTavernCacheKey(): Promise<string> {
    if (tavernCacheKey) {return tavernCacheKey;}
    tavernCacheKey = await loadFirstPartyIframeCacheKey(BUILD_INFO_PATH);
    return tavernCacheKey;
}

function getIframe(): HTMLIFrameElement | null {
    const iframe = document.getElementById(IFRAME_ID);
    return iframe instanceof HTMLIFrameElement ? iframe : null;
}

function isTavernMobileDevice(): boolean {
    const mobileTypes = ['mobile', 'tablet'];
    try {
        const bowser = globalThis as typeof globalThis & {
            Bowser?: { parse?: (userAgent: string) => { platform?: { type?: string } } };
        };
        const platformType = bowser.Bowser?.parse?.(navigator.userAgent)?.platform?.type;
        if (mobileTypes.includes(platformType)) {
            return true;
        }
    } catch {
        // Fall back to pointer/screen heuristics below.
    }
    return window.matchMedia('(pointer: coarse)').matches && window.matchMedia('(max-width: 900px)').matches;
}

function getTavernMobileTopOffset(): number {
    const rawValue = getComputedStyle(document.documentElement).getPropertyValue('--topBarBlockSize').trim();
    const parsedValue = Number.parseFloat(rawValue);
    return Number.isFinite(parsedValue) ? Math.max(0, parsedValue) : 0;
}

function getTavernMobileViewportHeight(): number {
    return Math.max(240, window.innerHeight - getTavernMobileTopOffset());
}

function applyTavernOverlayViewport(overlay = document.getElementById(OVERLAY_ID)): void {
    if (!(overlay instanceof HTMLElement)) {return;}
    overlay.style.left = '0';
    overlay.style.right = '0';
    overlay.style.width = '100vw';
    if (!isTavernMobileDevice()) {
        overlay.style.top = '0';
        overlay.style.height = '100vh';
        overlay.style.padding = '0';
        overlay.classList.remove('is-mobile');
        return;
    }
    const topOffset = getTavernMobileTopOffset();
    const viewportHeight = getTavernMobileViewportHeight();
    overlay.style.top = `${topOffset}px`;
    overlay.style.height = `${viewportHeight}px`;
    overlay.style.padding = 'env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px)';
    overlay.classList.add('is-mobile');
}

function installOverlayResizeHandler(overlay: HTMLElement): void {
    if (overlayResizeHandler) {return;}
    overlayResizeHandler = () => applyTavernOverlayViewport(overlay);
    window.addEventListener('resize', overlayResizeHandler);
    window.addEventListener('orientationchange', overlayResizeHandler);
    window.visualViewport?.addEventListener('resize', overlayResizeHandler);
    window.visualViewport?.addEventListener('scroll', overlayResizeHandler);
}

function removeOverlayResizeHandler(): void {
    if (!overlayResizeHandler) {return;}
    window.removeEventListener('resize', overlayResizeHandler);
    window.removeEventListener('orientationchange', overlayResizeHandler);
    window.visualViewport?.removeEventListener('resize', overlayResizeHandler);
    window.visualViewport?.removeEventListener('scroll', overlayResizeHandler);
    overlayResizeHandler = null;
}

function postToFrame(type: string, payload: Record<string, unknown> = {}): boolean {
    const iframe = getIframe();
    if (!iframe?.contentWindow) {return false;}
    const message = { type, payload };
    if (!frameReady) {
        pendingMessages.push(message);
        return false;
    }
    return postToIframe(iframe, message, SOURCE_HOST);
}

function flushPendingMessages(): void {
    if (!frameReady) {return;}
    const iframe = getIframe();
    if (!iframe?.contentWindow) {return;}
    pendingMessages.forEach((message) => postToIframe(iframe, message, SOURCE_HOST));
    pendingMessages = [];
}

async function sendConfigToFrame(options: Record<string, unknown> = {}): Promise<void> {
    const contextPayload = await buildTavernContext(options);
    postToFrame('xb-tavern:config', await buildTavernFrameConfig(contextPayload as unknown as Record<string, unknown>));
}

async function refreshContext(options: Record<string, unknown> = {}): Promise<void> {
    postToFrame('xb-tavern:context', await buildTavernContext(options) as unknown as Record<string, unknown>);
}

async function saveConfigFromFrame(payload: Record<string, unknown> = {}): Promise<void> {
    const requestId = String(payload.requestId || '');
    const configPatch = payload.payload && typeof payload.payload === 'object'
        ? payload.payload as Record<string, unknown>
        : {};
    const result = await saveTavernAgentConfig(configPatch, { silent: false });
    postToFrame('xb-tavern:config-saved', {
        requestId,
        ok: result.ok,
        config: result.config,
        error: result.error || '',
    });
    if (result.ok) {
        await sendConfigToFrame();
    }
}

function replyHostResult(requestId = '', payload: Record<string, unknown> = {}): void {
    postToFrame('xb-tavern:host-result', {
        requestId,
        ...payload,
    });
}

function handleHostRequestHeaders(payload: Record<string, unknown> = {}): void {
    replyHostResult(String(payload.requestId || ''), {
        ok: true,
        hostRequestHeaders: getRequestHeaders?.() || {},
    });
}

async function handleChatPresetRequest(type: string, payload: Record<string, unknown> = {}): Promise<void> {
    const requestId = String(payload.requestId || '');
    try {
        let result: unknown;
        if (type === 'xb-tavern:list-chat-presets') {
            result = listTavernChatPresetBundles();
        } else if (type === 'xb-tavern:get-chat-preset') {
            result = getTavernChatPresetBundle();
        } else if (type === 'xb-tavern:save-chat-preset') {
            result = await saveTavernChatPresetBundle(payload.payload);
        } else if (type === 'xb-tavern:select-chat-preset') {
            result = await selectTavernChatPresetBundle(payload.payload);
        }
        replyHostResult(requestId, {
            ok: true,
            result: result as Record<string, unknown>,
        });
        if (type !== 'xb-tavern:list-chat-presets') {
            await sendConfigToFrame();
        }
    } catch (error) {
        replyHostResult(requestId, {
            ok: false,
            error: error instanceof Error ? error.message : String(error || 'chat_preset_failed'),
        });
    }
}

async function handleWorldbookRequest(type: string, payload: Record<string, unknown> = {}): Promise<void> {
    const requestId = String(payload.requestId || '');
    try {
        let result: unknown;
        if (type === 'xb-tavern:list-worldbooks') {
            result = await listTavernWorldbooks();
        } else if (type === 'xb-tavern:get-worldbook') {
            result = await getTavernWorldbook(payload.payload);
        } else if (type === 'xb-tavern:save-worldbook') {
            result = await saveTavernWorldbook(payload.payload);
        } else if (type === 'xb-tavern:create-worldbook-entry') {
            result = await createTavernWorldbookEntry(payload.payload);
        } else if (type === 'xb-tavern:set-worldbook-active') {
            result = setTavernWorldbookActive(payload.payload);
        }
        replyHostResult(requestId, {
            ok: true,
            result: result as Record<string, unknown>,
        });
        if (type !== 'xb-tavern:list-worldbooks') {
            await sendConfigToFrame();
        }
    } catch (error) {
        replyHostResult(requestId, {
            ok: false,
            error: error instanceof Error ? error.message : String(error || 'worldbook_failed'),
        });
    }
}

async function handleRegexRequest(type: string, payload: Record<string, unknown> = {}): Promise<void> {
    const requestId = String(payload.requestId || '');
    try {
        let result: unknown;
        if (type === 'xb-tavern:list-regex-scripts') {
            result = listTavernRegexScripts();
        } else if (type === 'xb-tavern:save-regex-script') {
            result = await saveTavernRegexScript(payload.payload);
        } else if (type === 'xb-tavern:delete-regex-script') {
            result = await deleteTavernRegexScript(payload.payload);
        }
        replyHostResult(requestId, {
            ok: true,
            result: result as Record<string, unknown>,
        });
    } catch (error) {
        replyHostResult(requestId, {
            ok: false,
            error: error instanceof Error ? error.message : String(error || 'regex_failed'),
        });
    }
}

async function createOverlay(): Promise<HTMLElement> {
    const overlay = await createFirstPartyIframeOverlay({
        overlayId: OVERLAY_ID,
        iframeId: IFRAME_ID,
        htmlPath: HTML_PATH,
        version: await loadTavernCacheKey(),
        overlayCss: `
            position: fixed !important;
            left: 0 !important;
            right: 0 !important;
            top: 0;
            bottom: auto !important;
            width: 100vw !important;
            height: 100vh;
            height: 100dvh;
            z-index: 100001 !important;
            display: flex !important;
            align-items: stretch !important;
            justify-content: stretch !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            background: #171512 !important;
            overscroll-behavior: none;
            touch-action: manipulation;
        `,
        iframeCss: `
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            border: none !important;
            background: transparent !important;
        `,
    });
    applyTavernOverlayViewport(overlay);
    installOverlayResizeHandler(overlay);
    return overlay;
}

async function openTavern(): Promise<void> {
    const existingOverlay = document.getElementById(OVERLAY_ID);
    if (existingOverlay) {
        applyTavernOverlayViewport(existingOverlay);
        return;
    }
    frameReady = false;
    pendingMessages = [];
    installMessageHandler();
    await createOverlay();
}

function closeTavern(): void {
    removeOverlayResizeHandler();
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {overlay.remove();}
    frameReady = false;
    pendingMessages = [];
}

function handleFrameMessage(event: MessageEvent): void {
    const iframe = getIframe();
    if (!isTrustedMessage(event, iframe, SOURCE_APP)) {return;}
    const data = event.data || {};
    switch (data.type) {
        case 'xb-tavern:frame-ready':
            frameReady = true;
            void sendConfigToFrame().then(flushPendingMessages);
            break;
        case 'xb-tavern:close':
            closeTavern();
            break;
        case 'xb-tavern:refresh-context':
            void refreshContext(data.payload || {});
            break;
        case 'xb-tavern:save-config':
            void saveConfigFromFrame(data.payload || {});
            break;
        case 'xb-tavern:get-host-request-headers':
            handleHostRequestHeaders(data.payload || {});
            break;
        case 'xb-tavern:list-chat-presets':
        case 'xb-tavern:get-chat-preset':
        case 'xb-tavern:save-chat-preset':
        case 'xb-tavern:select-chat-preset':
            void handleChatPresetRequest(data.type, data.payload || {});
            break;
        case 'xb-tavern:list-worldbooks':
        case 'xb-tavern:get-worldbook':
        case 'xb-tavern:save-worldbook':
        case 'xb-tavern:create-worldbook-entry':
        case 'xb-tavern:set-worldbook-active':
            void handleWorldbookRequest(data.type, data.payload || {});
            break;
        case 'xb-tavern:list-regex-scripts':
        case 'xb-tavern:save-regex-script':
        case 'xb-tavern:delete-regex-script':
            void handleRegexRequest(data.type, data.payload || {});
            break;
        default:
            break;
    }
}

function installMessageHandler(): void {
    if (messageHandlerInstalled) {return;}
    // Guarded by isTrustedMessage in handleFrameMessage.
    // eslint-disable-next-line no-restricted-syntax
    window.addEventListener('message', handleFrameMessage);
    messageHandlerInstalled = true;
}

export async function initTavern(): Promise<void> {
    installMessageHandler();
    window.xiaobaixTavern = {
        open: openTavern,
        close: closeTavern,
        refreshContext,
    };
}

export function cleanupTavern(): void {
    closeTavern();
}

export { openTavern, closeTavern };
