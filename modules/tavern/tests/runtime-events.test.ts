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
