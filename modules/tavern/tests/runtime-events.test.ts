import test from 'node:test';
import assert from 'node:assert/strict';
import {
    createActionCheckEvent,
    extractActionCheckRegexMarkers,
    injectActionCheckRegexMarkers,
} from '../shared/runtime-events';

test('action check regex markers remap card offsets after display regex deletes earlier text', () => {
    const rawText = '『状态栏会被显示正则删除』她抬手推开木门。';
    const event = createActionCheckEvent({
        action: '推门',
        stat: '力量',
        difficulty: 12,
        roll: 16,
        success: true,
        insertAfterChars: rawText.indexOf('她抬手') + '她抬手'.length,
    });

    const marked = injectActionCheckRegexMarkers(rawText, [event]);
    const regexedText = marked.text.replace(/『.*?』/gs, '');
    const normalized = extractActionCheckRegexMarkers(regexedText, [event], marked.boundaries);

    assert.equal(normalized.text, '她抬手推开木门。');
    assert.equal(normalized.events.length, 1);
    assert.equal(normalized.events[0].insertAfterChars, '她抬手'.length);
});

test('action check regex markers preserve normalized stakes across whole-event remapping', () => {
    const rawText = '她猛地扑向洞口，试图在塌方前钻出去。';
    const normalizedStakes = 'x'.repeat(240);
    const event = createActionCheckEvent({
        action: '钻出洞口',
        stat: '敏捷',
        difficulty: 14,
        roll: 17,
        success: true,
        insertAfterChars: rawText.indexOf('，'),
        stakes: `  ${'x'.repeat(260)}  `,
    });

    assert.equal(event.stakes, normalizedStakes);

    const marked = injectActionCheckRegexMarkers(rawText, [event]);
    const regexedText = marked.text.replace('猛地', '');
    const normalized = extractActionCheckRegexMarkers(regexedText, [event], marked.boundaries);

    assert.equal(normalized.text, '她扑向洞口，试图在塌方前钻出去。');
    assert.equal(normalized.events.length, 1);
    assert.equal(normalized.events[0].stakes, normalizedStakes);
    assert.equal(normalized.events[0].insertAfterChars, rawText.indexOf('，') - '猛地'.length);
});
