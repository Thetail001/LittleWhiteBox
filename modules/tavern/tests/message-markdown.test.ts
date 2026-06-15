import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderMarkdownToHtml } from '../../agent-core/ui/message-markdown.js';

test('tavern markdown renders emphasis from the bundled parser without global libraries', () => {
    const html = renderMarkdownToHtml('*文字*');

    assert.match(html, /<em>文字<\/em>/);
});

test('tavern markdown keeps details and table blocks renderable for RP cards', () => {
    const html = renderMarkdownToHtml([
        '>>>角色表规范',
        '',
        '<details><summary>abc</summary>',
        '',
        '| 名字| 身份|',
        '|---|---|',
        '| Seraphina | 林中空地的守护者、医者 |',
        '',
        '</details>',
    ].join('\n'));

    assert.match(html, /<blockquote>/);
    assert.match(html, /<details><summary>abc<\/summary>/);
    assert.match(html, /<table>/);
    assert.match(html, /<td>Seraphina<\/td>/);
    assert.match(html, /<\/details>/);
});

test('tavern markdown sanitizes ordinary chat HTML without disabling html code block previews', () => {
    const html = renderMarkdownToHtml([
        '<script>alert(1)</script>',
        '[bad](javascript:alert(2))',
        '<details ontoggle=alert(3) open><summary onclick=alert(4)>abc</summary>正文</details>',
    ].join('\n'));

    assert.doesNotMatch(html, /<script/i);
    assert.doesNotMatch(html, /javascript:/i);
    assert.doesNotMatch(html, /\son[a-z]+\s*=/i);
    assert.match(html, /<details open><summary>abc<\/summary>/);
});
