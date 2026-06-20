import test from 'node:test';
import assert from 'node:assert/strict';

import { layoutTavernAtlasDocument } from '../app-src/atlas-display';
import type { TavernAtlasDocument } from '../shared/structured-state';

function doc(locations: TavernAtlasDocument['locations'], links: TavernAtlasDocument['links'] = []): TavernAtlasDocument {
    return {
        version: 1,
        locations,
        links,
        actors: [],
    };
}

test('layoutTavernAtlasDocument handles empty, single root, and stable sibling order', () => {
    const empty = layoutTavernAtlasDocument(doc([]));
    assert.equal(empty.nodes.length, 0);
    assert.deepEqual(empty.viewBox, [0, 0, 640, 360]);

    const single = layoutTavernAtlasDocument(doc([
        { key: 'office', name: '办公室', scale: 'room', status: 'visited' },
    ]));
    assert.equal(single.nodes.length, 1);
    assert.equal(single.nodes[0].key, 'office');

    const first = layoutTavernAtlasDocument(doc([
        { key: 'b', name: 'B', scale: 'room', status: 'visited', parent: 'root' },
        { key: 'root', name: 'Root', scale: 'building', status: 'visited' },
        { key: 'a', name: 'A', scale: 'room', status: 'mentioned', parent: 'root' },
    ]));
    const second = layoutTavernAtlasDocument(doc([
        { key: 'a', name: 'A', scale: 'room', status: 'visited', parent: 'root' },
        { key: 'root', name: 'Root', scale: 'building', status: 'visited' },
        { key: 'b', name: 'B', scale: 'room', status: 'visited', parent: 'root' },
    ]));
    assert.deepEqual(
        first.nodes.map((node) => [node.key, node.x, node.y]),
        second.nodes.map((node) => [node.key, node.x, node.y]),
    );
    assert.equal(first.nodes.find((node) => node.key === 'root')?.depth, 0);
    assert.equal(first.nodes.find((node) => node.key === 'a')?.depth, 1);
});

test('layoutTavernAtlasDocument defends against dangling parent, cycles, and dangling links', () => {
    const danglingParent = layoutTavernAtlasDocument(doc([
        { key: 'office', name: '办公室', scale: 'room', status: 'visited', parent: 'missing' },
    ]));
    assert.equal(danglingParent.nodes.length, 1);
    assert.equal(danglingParent.warnings.includes('atlas_parent_missing:office'), true);

    const cycle = layoutTavernAtlasDocument(doc([
        { key: 'a', name: 'A', scale: 'room', status: 'visited', parent: 'b' },
        { key: 'b', name: 'B', scale: 'room', status: 'visited', parent: 'a' },
    ]));
    assert.equal(cycle.nodes.length, 2);
    assert.equal(cycle.warnings.includes('atlas_parent_cycle'), true);

    const linkSkip = layoutTavernAtlasDocument(doc([
        { key: 'office', name: '办公室', scale: 'room', status: 'visited' },
    ], [
        { id: 'bad', from: 'office', to: 'missing', kind: 'door', bidirectional: true },
    ]));
    assert.equal(linkSkip.links.length, 0);
    assert.equal(linkSkip.warnings.includes('atlas_link_endpoint_missing:bad'), true);
});
