export const TAVERN_MAP_DOC_TYPE = 'tavern.map' as const;
export const TAVERN_MAP_DOC_ID = 'main';
export const TAVERN_MAP_LABEL_PREFIX = '__label__';

export type TavernMapTheme = 'parchment' | 'paper' | 'dark' | 'blueprint' | 'grid';
export type TavernMapStatus = 'uninitialized' | 'active';

export interface TavernSeedMapDocument {
    meta: {
        name: string | null;
        viewBox: [number, number, number, number] | null;
        theme: TavernMapTheme;
        status: TavernMapStatus;
        hint: string;
    };
    elements: [];
}

export function buildSeedMapHint(): string {
    return [
        '空地图。本轮若存在明确的当前场景，就照下面的最小样例初始化；把 <尖括号> 换成本场景事实，再按需增减元素。',
        '室内场景样例：{"ops":[{"op":"meta","set":{"name":"<地点名>","viewBox":[0,0,400,300],"status":"active"}},{"op":"add","element":{"id":"wall","at":[40,40],"rect":[320,220],"cat":"wall"}},{"op":"add","element":{"id":"door","at":[200,260],"icon":"o","cat":"door"}},{"op":"add","element":{"id":"player","at":[200,180],"icon":"o","cat":"marker"}},{"op":"add","element":{"id":"label","at":[200,24],"text":"<地点名>","cat":"label"}}]}',
        '室外场景样例：{"ops":[{"op":"meta","set":{"name":"<地点名>","viewBox":[0,0,800,600],"status":"active"}},{"op":"add","element":{"id":"ground","at":[400,300],"circle":150,"cat":"terrain"}},{"op":"add","element":{"id":"path","at":[0,300],"path":[[800,0]],"cat":"road"}},{"op":"add","element":{"id":"player","at":[400,320],"icon":"o","cat":"marker"}},{"op":"add","element":{"id":"label","at":[400,130],"text":"<地点名>","cat":"label"}}]}',
        '要求：至少放一个空间几何元素（rect/circle/path/curve/icon），不能只发 text 标签。以后每轮只增量 add/modify/remove；无空间变化就跳过，不要重置整张图。',
        '`viewBox` 是相机/取景框，改它不会移动任何元素；玩家移动先改玩家 `at`，若玩家超出当前取景框，再用 `meta.viewBox` 跟随。',
        '元素统一用 `at:[x,y]` 加一个形状字段：rect/circle/path/curve/icon/text。path/curve 有 `at` 时是相对偏移；没有 `at` 时点数组视为绝对坐标，首点会被当作锚点。',
    ].join(' ');
}

export function createSeedMapDocument(): TavernSeedMapDocument {
    return {
        meta: {
            name: null,
            viewBox: null,
            theme: 'parchment',
            status: 'uninitialized',
            hint: buildSeedMapHint(),
        },
        elements: [],
    };
}

export function isSeedLabelId(value: unknown): boolean {
    return String(value || '').startsWith(TAVERN_MAP_LABEL_PREFIX);
}

export function buildSeedLabelId(id: string): string {
    return `${TAVERN_MAP_LABEL_PREFIX}${id}`;
}

export function isUninitializedMapData(value: unknown): boolean {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {return false;}
    const meta = (value as { meta?: { status?: unknown } }).meta;
    return meta?.status === 'uninitialized';
}
