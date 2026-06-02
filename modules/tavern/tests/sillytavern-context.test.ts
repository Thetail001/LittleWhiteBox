import test from 'node:test';
import assert from 'node:assert/strict';

import {
    buildXbTavernContextFromSillyTavern,
    collectSillyTavernWorldbookNames,
    normalizeWorldbookData,
} from '../shared/sillytavern-context';

test('sillytavern context adapter extracts character, persona, chat and worldbooks', () => {
    const source = {
        characterId: 0,
        name1: 'Mira',
        characters: [{
            name: 'Aster',
            avatar: 'aster.png',
            data: {
                description: 'Pilot.',
                extensions: { world: 'AsterWorld' },
            },
        }],
        chat: [
            { is_user: true, name: 'Mira', mes: 'Hello.' },
            { is_user: false, name: 'Aster', mes: 'Hi.' },
        ],
        worldNames: ['ChatWorld'],
        charLore: [{ name: 'aster.png', extraBooks: ['ExtraWorld'] }],
    };
    const book = normalizeWorldbookData('AsterWorld', {
        entries: {
            one: { uid: 1, content: 'Lore.', constant: true },
        },
    });
    const context = buildXbTavernContextFromSillyTavern(source, { worldBooks: [book] });

    assert.equal(context.character?.name, 'Aster');
    assert.equal(context.user?.name, 'Mira');
    assert.equal(context.history?.length, 2);
    assert.deepEqual(collectSillyTavernWorldbookNames(source), ['AsterWorld', 'ChatWorld', 'ExtraWorld']);
    assert.equal(context.worldEntries?.[0].content, 'Lore.');
});

test('sillytavern context adapter returns an empty diagnostic-safe shape when data is missing', () => {
    const context = buildXbTavernContextFromSillyTavern({}, {});

    assert.equal(context.character?.name, '');
    assert.equal(context.user?.name, 'User');
    assert.deepEqual(context.history, []);
    assert.deepEqual(context.worldBooks, []);
    assert.deepEqual(context.worldEntries, []);
});

test('sillytavern context adapter does not treat system name as a character card', () => {
    const context = buildXbTavernContextFromSillyTavern({
        name2: 'SillyTavern System',
    }, {});

    assert.equal(context.character?.name, '');
});

test('sillytavern context adapter switches character snapshots by id', () => {
    const source = {
        characterId: 1,
        name1: 'Mira',
        characters: [
            { name: 'Aster', data: { description: 'Pilot.' } },
            { name: 'Nia', data: { description: 'Archivist.', extensions: { world: 'NiaWorld' } } },
        ],
    };
    const book = normalizeWorldbookData('NiaWorld', {
        entries: {
            one: { uid: 'nia-1', content: 'Archive lore.', constant: true },
        },
    });
    const context = buildXbTavernContextFromSillyTavern(source, { worldBooks: [book] });

    assert.equal(context.character?.name, 'Nia');
    assert.equal(context.character?.description, 'Archivist.');
    assert.deepEqual(collectSillyTavernWorldbookNames(source), ['NiaWorld']);
    assert.equal(context.worldEntries?.[0].sourceWorldBook, 'NiaWorld');
});

test('sillytavern context adapter includes embedded character lorebook entries', () => {
    const source = {
        characterId: 0,
        characters: [{
            name: 'Aster',
            data: {
                character_book: {
                    name: 'AsterEmbedded',
                    entries: [
                        { uid: 1, content: 'Embedded lore.', constant: true },
                    ],
                },
            },
        }],
        chat: [{ is_user: true, mes: 'Hello.' }],
    };
    const context = buildXbTavernContextFromSillyTavern(source, {});

    assert.deepEqual(collectSillyTavernWorldbookNames(source), []);
    assert.equal(context.worldBooks?.[0]?.name, 'AsterEmbedded');
    assert.equal(context.worldEntries?.[0]?.content, 'Embedded lore.');
    assert.equal(context.worldEntries?.[0]?.sourceWorldBook, 'AsterEmbedded');
});
