import test from 'node:test';
import assert from 'node:assert/strict';

import {
    AGENT_MESSAGE_WINDOW_DEFAULT,
    expandMessageWindow,
    getMessageWindow,
    resetMessageWindow,
} from '../app-src/message-window';

test('tavern message window matches ebook defaults and expands older messages in chunks', () => {
    const state = { uiMessageWindowLimit: 100 };

    resetMessageWindow(state);
    assert.equal(state.uiMessageWindowLimit, AGENT_MESSAGE_WINDOW_DEFAULT);

    const initial = getMessageWindow(state, 12);
    assert.equal(initial.hiddenBefore, 7);
    assert.equal(initial.visibleCount, 5);

    const expanded = expandMessageWindow(state, 12);
    assert.equal(expanded, true);

    const afterExpand = getMessageWindow(state, 12);
    assert.equal(afterExpand.hiddenBefore, 0);
    assert.equal(afterExpand.visibleCount, 12);
});
