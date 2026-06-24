import type { TavernAtlasDocument, TavernAtlasLink, TavernAtlasLocation } from '../shared/structured-state';

export interface AtlasLayoutResult {
    nodes: AtlasLayoutNode[];
    links: AtlasLayoutLink[];
    viewBox: [number, number, number, number];
    warnings: string[];
}

export interface AtlasLayoutNode {
    key: string;
    x: number;
    y: number;
    width: number;
    height: number;
    depth: number;
}

export interface AtlasLayoutLink {
    id: string;
    from: string;
    to: string;
    path: string;
}

const NODE_WIDTH = 128;
const NODE_HEIGHT = 54;
const H_GAP = 36;
const V_GAP = 78;
const ROOT_GAP = 72;

function sortLocations(locations: TavernAtlasLocation[]): TavernAtlasLocation[] {
    return [...locations].sort((left, right) => {
        return String(left.parent || '').localeCompare(String(right.parent || ''))
            || String(left.name || '').localeCompare(String(right.name || ''))
            || String(left.key || '').localeCompare(String(right.key || ''));
    });
}

function collectCycleKeys(locations: Map<string, TavernAtlasLocation>): Set<string> {
    const cycleKeys = new Set<string>();
    locations.forEach((location) => {
        const seen = new Set<string>();
        let current: TavernAtlasLocation | undefined = location;
        while (current?.parent) {
            if (seen.has(current.key)) {
                seen.forEach((key) => cycleKeys.add(key));
                cycleKeys.add(current.key);
                break;
            }
            seen.add(current.key);
            current = locations.get(current.parent);
        }
    });
    return cycleKeys;
}

export function layoutTavernAtlasDocument(document: TavernAtlasDocument | null | undefined): AtlasLayoutResult {
    const locations = Array.isArray(document?.locations) ? sortLocations(document.locations) : [];
    const locationMap = new Map(locations.map((location) => [location.key, location]));
    const cycleKeys = collectCycleKeys(locationMap);
    const warnings: string[] = [];
    if (cycleKeys.size) {
        warnings.push('atlas_parent_cycle');
    }

    const children = new Map<string, TavernAtlasLocation[]>();
    const roots: TavernAtlasLocation[] = [];
    locations.forEach((location) => {
        const parent = location.parent || '';
        if (parent && locationMap.has(parent) && !cycleKeys.has(location.key) && !cycleKeys.has(parent)) {
            const bucket = children.get(parent) || [];
            bucket.push(location);
            children.set(parent, bucket);
            return;
        }
        if (parent && !locationMap.has(parent)) {
            warnings.push(`atlas_parent_missing:${location.key}`);
        }
        roots.push(location);
    });
    children.forEach((bucket, key) => children.set(key, sortLocations(bucket)));

    const nodes: AtlasLayoutNode[] = [];
    const subtreeWidth = (location: TavernAtlasLocation): number => {
        const bucket = children.get(location.key) || [];
        if (!bucket.length) {return NODE_WIDTH;}
        return Math.max(
            NODE_WIDTH,
            bucket.reduce((sum, child, index) => sum + subtreeWidth(child) + (index > 0 ? H_GAP : 0), 0),
        );
    };

    const placeNode = (location: TavernAtlasLocation, left: number, depth: number): number => {
        const width = subtreeWidth(location);
        const x = left + (width - NODE_WIDTH) / 2;
        nodes.push({
            key: location.key,
            x,
            y: depth * (NODE_HEIGHT + V_GAP),
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
            depth,
        });
        let childLeft = left;
        (children.get(location.key) || []).forEach((child) => {
            const childWidth = subtreeWidth(child);
            placeNode(child, childLeft, depth + 1);
            childLeft += childWidth + H_GAP;
        });
        return width;
    };

    let left = 0;
    sortLocations(roots).forEach((root) => {
        const width = placeNode(root, left, 0);
        left += width + ROOT_GAP;
    });

    const nodeMap = new Map(nodes.map((node) => [node.key, node]));
    const links = (Array.isArray(document?.links) ? document.links : [])
        .map((link: TavernAtlasLink): AtlasLayoutLink | null => {
            const from = nodeMap.get(link.from);
            const to = nodeMap.get(link.to);
            if (!from || !to) {
                warnings.push(`atlas_link_endpoint_missing:${link.id}`);
                return null;
            }
            const x1 = from.x + from.width / 2;
            const y1 = from.y + from.height / 2;
            const x2 = to.x + to.width / 2;
            const y2 = to.y + to.height / 2;
            const midY = (y1 + y2) / 2;
            return {
                id: link.id,
                from: link.from,
                to: link.to,
                path: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
            };
        })
        .filter((link): link is AtlasLayoutLink => !!link);

    if (!nodes.length) {
        return { nodes, links, viewBox: [0, 0, 640, 360], warnings };
    }
    const minX = Math.min(...nodes.map((node) => node.x)) - 48;
    const minY = Math.min(...nodes.map((node) => node.y)) - 48;
    const maxX = Math.max(...nodes.map((node) => node.x + node.width)) + 48;
    const maxY = Math.max(...nodes.map((node) => node.y + node.height)) + 48;
    return {
        nodes,
        links,
        viewBox: [minX, minY, Math.max(320, maxX - minX), Math.max(220, maxY - minY)],
        warnings,
    };
}
