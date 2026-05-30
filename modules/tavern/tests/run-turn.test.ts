import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';

import db, {
    createTavernSession,
    deleteTavernMessages,
    getTavernSession,
    listTavernMessages,
    updateTavernSessionSnapshot,
} from '../shared/session-db';
import { createDefaultXbTavernPreset } from '../shared/presets';
import {
    buildContextHistory,
    buildTavernRequestSnapshot,
    runTavernOnce,
    runXbTavernTurn,
    type XbTavernRunResult,
    type TavernRunOnceOptions,
} from '../app-src/runtime/run-once';
import { createXbTavernAgentRuntime, EMPTY_XB_TAVERN_CAPABILITY_REGISTRY } from '../app-src/runtime/agent-runtime';
import { resolveXbTavernProviderConfig } from '../app-src/runtime/provider';

async function resetDb() {
    await db.delete();
    await db.open();
}

test('xb tavern run turn saves user and assistant messages and updates session state', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const result = await runXbTavernTurn({
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster', description: 'Pilot.' },
            user: { name: 'Player' },
            worldBooks: [{
                name: 'Lore',
                entries: [{
                    uid: 'sticky-entry',
                    content: 'Station lore.',
                    constant: true,
                    sticky: 2,
                }],
            }],
        },
        preset,
        currentUserMessage: 'Hello.',
        executeRunOnce: async (options: TavernRunOnceOptions) => ({
            text: 'Hi from Aster.',
            provider: 'fake-provider',
            model: 'fake-model',
            finishReason: 'stop',
            requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages, {
                provider: 'fake-provider',
                model: 'fake-model',
            }),
        }),
    });

    assert.equal(result.error, undefined);
    assert.equal(result.previewMatchesRequest, true);
    assert.equal(result.nextTurn, 1);
    assert.equal(result.requestSnapshot.provider, 'fake-provider');
    assert.equal(result.requestSnapshot.model, 'fake-model');
    assert.equal(result.requestSnapshot.presetName, '默认');
    const messages = await listTavernMessages(result.sessionId);
    assert.deepEqual(messages.map((message) => message.role), ['user', 'assistant']);
    assert.equal(messages[1]?.content, 'Hi from Aster.');
    assert.equal(messages[1]?.provider, 'fake-provider');
    assert.equal(messages[1]?.model, 'fake-model');
    assert.equal(messages[1]?.finishReason, 'stop');
    const session = await getTavernSession(result.sessionId);
    assert.equal(session?.state?.turn, 1);
    assert.equal(Object.keys(session?.state?.worldEntryStates || {}).some((key) => key.includes('sticky-entry')), true);
    assert.equal(session?.state?.lastProvider, 'fake-provider');
});

test('xb tavern provider resolver reports shared API readiness and request audit metadata', () => {
    const missing = resolveXbTavernProviderConfig({
        currentPresetName: '默认',
        presets: {
            默认: {
                provider: 'openai-compatible',
                modelConfigs: {
                    'openai-compatible': {
                        baseUrl: 'https://example.com/v1',
                        model: '',
                        apiKey: '',
                    },
                },
            },
        },
    });
    assert.equal(missing.readiness.ok, false);
    assert.deepEqual(missing.readiness.missing, ['模型', 'API Key']);

    const ready = resolveXbTavernProviderConfig({
        currentPresetName: '酒馆 Claude',
        presets: {
            '酒馆 Claude': {
                provider: 'sillytavern-claude',
                modelConfigs: {
                    'sillytavern-claude': {
                        model: 'claude-sonnet-4-0',
                        apiKey: '',
                    },
                },
            },
        },
    });
    assert.equal(ready.readiness.ok, true);
    assert.equal(ready.currentPresetName, '酒馆 Claude');
    assert.equal(ready.providerLabel, 'SillyTavern Claude');

    const snapshot = buildTavernRequestSnapshot({
        currentPresetName: '酒馆 Claude',
        presets: {
            '酒馆 Claude': {
                provider: 'sillytavern-claude',
                modelConfigs: {
                    'sillytavern-claude': {
                        model: 'claude-sonnet-4-0',
                    },
                },
            },
        },
    }, [{ role: 'user', content: 'Hello.' }]);
    assert.equal(snapshot.presetName, '酒馆 Claude');
    assert.equal(snapshot.providerLabel, 'SillyTavern Claude');
    assert.equal(snapshot.model, 'claude-sonnet-4-0');
});

test('xb tavern runtime keeps capability registry empty until agent tools are added', () => {
    const provider = resolveXbTavernProviderConfig({
        currentPresetName: '默认',
        presets: {
            默认: {
                provider: 'sillytavern-claude',
                modelConfigs: {
                    'sillytavern-claude': { model: 'claude-sonnet-4-0' },
                },
            },
        },
    });
    const runtime = createXbTavernAgentRuntime(provider);
    const task = runtime.buildChatTask({
        messages: [{ role: 'user', content: 'Hello.' }],
    });
    assert.deepEqual(runtime.capabilities, EMPTY_XB_TAVERN_CAPABILITY_REGISTRY);
    assert.deepEqual(task.tools, []);
    assert.equal(task.toolChoice, 'none');
});

test('xb tavern direct runtime fails before provider call when shared API config is incomplete', async () => {
    await assert.rejects(
        () => runTavernOnce({
            agentConfig: {
                currentPresetName: '默认',
                presets: {
                    默认: {
                        provider: 'openai-compatible',
                        modelConfigs: {
                            'openai-compatible': {
                                model: '',
                                apiKey: '',
                            },
                        },
                    },
                },
            },
            messages: [{ role: 'user', content: 'Hello.' }],
        }),
        /请先在 API 配置里选择模型\/填写 Key/,
    );
});

test('xb tavern run turn records provider failures as error assistant messages', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const result = await runXbTavernTurn({
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster' },
        },
        preset,
        currentUserMessage: 'Fail once.',
        executeRunOnce: async () => {
            throw new Error('provider_failed');
        },
    });

    assert.equal(result.error, 'provider_failed');
    assert.equal(result.finishReason, 'error');
    assert.equal(result.nextTurn, 0);
    const messages = await listTavernMessages(result.sessionId);
    const savedRequestSnapshot = messages[1]?.requestSnapshot as { messageCount?: number } | undefined;
    assert.deepEqual(messages.map((message) => message.role), ['user', 'assistant']);
    assert.equal(messages[1]?.error, true);
    assert.equal(messages[1]?.content, 'provider_failed');
    assert.equal(savedRequestSnapshot?.messageCount, result.requestSnapshot.messageCount);
    const session = await getTavernSession(result.sessionId);
    assert.equal(session?.state?.lastError, 'provider_failed');
    assert.equal(session?.state?.turn, 0);

    let retryRaw = '';
    await runXbTavernTurn({
        sessionId: result.sessionId,
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster' },
        },
        preset,
        currentUserMessage: 'Retry.',
        executeRunOnce: async (options: TavernRunOnceOptions) => {
            retryRaw = JSON.stringify(options.messages);
            return {
                text: 'Recovered.',
                requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
            };
        },
    });
    assert.doesNotMatch(retryRaw, /provider_failed/);
});

test('xb tavern run turn records aborted partial text as assistant message', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const result = await runXbTavernTurn({
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster' },
        },
        preset,
        currentUserMessage: 'Start then stop.',
        executeRunOnce: async (options: TavernRunOnceOptions) => {
            options.onStreamProgress?.({ text: '# Partial\n\nStill useful.' });
            const error = new Error('aborted by user');
            error.name = 'AbortError';
            throw error;
        },
    });

    assert.equal(result.error, undefined);
    assert.equal(result.finishReason, 'aborted');
    assert.equal(result.nextTurn, 1);
    const messages = await listTavernMessages(result.sessionId);
    assert.deepEqual(messages.map((message) => message.role), ['user', 'assistant']);
    assert.equal(messages[1]?.content, '# Partial\n\nStill useful.');
    assert.equal(messages[1]?.error, false);
    assert.equal(messages[1]?.finishReason, 'aborted');
    assert.doesNotMatch(messages[1]?.content || '', /<h1>/);
});

test('xb tavern run turn records aborted empty run as error assistant message', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const result = await runXbTavernTurn({
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster' },
        },
        preset,
        currentUserMessage: 'Stop before text.',
        executeRunOnce: async () => {
            const error = new Error('request aborted');
            error.name = 'AbortError';
            throw error;
        },
    });

    assert.equal(result.error, '已停止生成。');
    assert.equal(result.finishReason, 'aborted');
    assert.equal(result.nextTurn, 0);
    const messages = await listTavernMessages(result.sessionId);
    assert.deepEqual(messages.map((message) => message.role), ['user', 'assistant']);
    assert.equal(messages[1]?.content, '已停止生成。');
    assert.equal(messages[1]?.error, true);
    assert.equal(messages[1]?.finishReason, 'aborted');
    const session = await getTavernSession(result.sessionId);
    assert.equal(session?.state?.turn, 0);
});

test('xb tavern run turn keeps running when UI callbacks fail', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const originalWarn = console.warn;
    console.warn = () => {};
    let result: XbTavernRunResult | undefined;
    try {
        result = await runXbTavernTurn({
            agentConfig: { provider: 'fake-provider', model: 'fake-model' },
            contextSnapshot: {
                character: { id: 'char-1', name: 'Aster' },
            },
            preset,
            currentUserMessage: 'Do not let UI callbacks stop the turn.',
            onUserMessageSaved: () => {
                throw new Error('ui_user_callback_failed');
            },
            onAssistantMessageSaved: () => {
                throw new Error('ui_assistant_callback_failed');
            },
            executeRunOnce: async (options: TavernRunOnceOptions) => ({
                text: 'Still completed.',
                requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
            }),
        });
    } finally {
        console.warn = originalWarn;
    }

    assert.ok(result);
    assert.equal(result.error, undefined);
    assert.equal(result.nextTurn, 1);
    const messages = await listTavernMessages(result.sessionId);
    assert.deepEqual(messages.map((message) => `${message.role}:${message.content}`), [
        'user:Do not let UI callbacks stop the turn.',
        'assistant:Still completed.',
    ]);
});

test('xb tavern run turn can rerun from an existing user without duplicating the user message', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const first = await runXbTavernTurn({
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster' },
        },
        preset,
        currentUserMessage: 'Try again.',
        executeRunOnce: async (options: TavernRunOnceOptions) => ({
            text: 'Old answer.',
            requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
        }),
    });
    assert.equal(await deleteTavernMessages(first.sessionId, [1]), 1);

    let rawMessages = '';
    await runXbTavernTurn({
        sessionId: first.sessionId,
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'char-1', name: 'Aster' },
        },
        preset,
        currentUserMessage: 'ignored because reused order wins',
        reuseUserMessageOrder: 0,
        executeRunOnce: async (options: TavernRunOnceOptions) => {
            rawMessages = JSON.stringify(options.messages);
            return {
                text: 'New answer.',
                requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
            };
        },
    });

    const messages = await listTavernMessages(first.sessionId);
    assert.deepEqual(messages.map((message) => `${message.order}:${message.role}:${message.content}`), [
        '0:user:Try again.',
        '1:assistant:New answer.',
    ]);
    assert.equal((rawMessages.match(/Try again\./g) || []).length, 1);
    assert.doesNotMatch(rawMessages, /ignored because reused order wins/);
});

test('xb tavern rerun deletes future messages and rebuilds state from remaining history', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const contextSnapshot = {
        character: { id: 'char-1', name: 'Aster' },
        worldBooks: [{
            name: 'Lore',
            entries: [{
                uid: 'sticky-entry',
                content: 'Persistent lore.',
                constant: true,
                sticky: 8,
            }, {
                uid: 'second-entry',
                content: 'Only second turn lore.',
                key: ['Second user'],
                sticky: 6,
            }],
        }],
    };
    const first = await runXbTavernTurn({
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot,
        preset,
        currentUserMessage: 'First user.',
        executeRunOnce: async (options: TavernRunOnceOptions) => ({
            text: 'First answer.',
            requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
        }),
    });
    await runXbTavernTurn({
        sessionId: first.sessionId,
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot,
        preset,
        currentUserMessage: 'Second user.',
        executeRunOnce: async (options: TavernRunOnceOptions) => ({
            text: 'Second answer.',
            requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
        }),
    });

    const rerun = await runXbTavernTurn({
        sessionId: first.sessionId,
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot,
        preset,
        currentUserMessage: 'ignored',
        reuseUserMessageOrder: 0,
        executeRunOnce: async (options: TavernRunOnceOptions) => ({
            text: 'Replacement answer.',
            requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
        }),
    });

    assert.equal(rerun.nextTurn, 1);
    const messages = await listTavernMessages(first.sessionId);
    assert.deepEqual(messages.map((message) => `${message.order}:${message.role}:${message.content}`), [
        '0:user:First user.',
        '1:assistant:Replacement answer.',
    ]);
    const session = await getTavernSession(first.sessionId);
    assert.equal(session?.state?.turn, 1);
    assert.deepEqual(session?.state?.worldEntryStates, {
        'Lore\u0000sticky-entry': { stickyUntilTurn: 8 },
    });
});

test('xb tavern context history filters saved error messages for preview and runtime', () => {
    const history = buildContextHistory([
        {
            sessionId: 'session',
            order: 0,
            role: 'user',
            content: 'Hello.',
            createdAt: 1,
        },
        {
            sessionId: 'session',
            order: 1,
            role: 'assistant',
            content: 'provider_failed',
            error: true,
            createdAt: 2,
        },
        {
            sessionId: 'session',
            order: 2,
            role: 'assistant',
            content: 'Recovered.',
            createdAt: 3,
        },
    ]);

    assert.deepEqual(history, [
        { role: 'user', content: 'Hello.' },
        { role: 'assistant', content: 'Recovered.' },
    ]);
});

test('xb tavern run turn keeps existing session context locked until explicit snapshot refresh', async () => {
    await resetDb();
    const preset = createDefaultXbTavernPreset();
    const session = await createTavernSession({
        title: 'Locked',
        characterId: 'old',
        characterName: 'Old Character',
        contextSnapshot: {
            character: { id: 'old', name: 'Old Character', description: 'Old card.' },
        },
        presetId: preset.id,
        presetName: preset.name,
    });
    let sentRaw = '';
    await runXbTavernTurn({
        sessionId: session.id,
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'new', name: 'New Character', description: 'New card.' },
        },
        preset,
        currentUserMessage: 'Who are you?',
        executeRunOnce: async (options: TavernRunOnceOptions) => {
            sentRaw = JSON.stringify(options.messages);
            return {
                text: 'I am old.',
                requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
            };
        },
    });
    assert.match(sentRaw, /Old Character/);
    assert.doesNotMatch(sentRaw, /New Character/);

    await updateTavernSessionSnapshot(session.id, {
        contextSnapshot: {
            character: { id: 'new', name: 'New Character', description: 'New card.' },
        },
    });
    await runXbTavernTurn({
        sessionId: session.id,
        agentConfig: { provider: 'fake-provider', model: 'fake-model' },
        contextSnapshot: {
            character: { id: 'ignored', name: 'Ignored Character' },
        },
        preset,
        currentUserMessage: 'And now?',
        executeRunOnce: async (options: TavernRunOnceOptions) => {
            sentRaw = JSON.stringify(options.messages);
            return {
                text: 'I am new.',
                requestSnapshot: buildTavernRequestSnapshot(options.agentConfig, options.messages),
            };
        },
    });
    assert.match(sentRaw, /New Character/);
    assert.doesNotMatch(sentRaw, /Ignored Character/);
});
