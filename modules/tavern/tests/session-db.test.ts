import 'fake-indexeddb/auto';
import test from 'node:test';
import assert from 'node:assert/strict';

import db, {
    appendTavernMessage,
    createTavernSession,
    deriveAndActivateDefaultTavernPreset,
    getActiveTavernPresetId,
    getSelectedTavernSessionId,
    listUserTavernPresets,
    listTavernMessages,
    loadActiveTavernPreset,
    saveTavernPreset,
    setActiveTavernPresetId,
} from '../shared/session-db';
import { DEFAULT_XB_TAVERN_PRESET_ID, createDefaultXbTavernPreset } from '../shared/presets';

test('tavern session db stores independent sessions and messages', async () => {
    await db.delete();
    await db.open();

    const session = await createTavernSession({
        title: 'Aster test',
        characterId: '0',
        characterName: 'Aster',
    });
    await appendTavernMessage(session.id, { role: 'user', content: 'Hello.' });
    await appendTavernMessage(session.id, { role: 'assistant', content: 'Hi.' });

    assert.equal(await getSelectedTavernSessionId(), session.id);
    assert.deepEqual((await listTavernMessages(session.id)).map((message) => message.role), ['user', 'assistant']);
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
