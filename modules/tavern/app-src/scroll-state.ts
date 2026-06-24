export interface ElementScrollSnapshot {
    scrollTop: number;
    nearBottom: boolean;
    anchorKey: string;
    anchorTopOffset: number;
}

interface AnchorConfig {
    itemSelector: string;
    datasetKey: string;
}

export function captureElementScrollState(
    node: HTMLElement | null | undefined,
    anchorConfig?: AnchorConfig | null,
): ElementScrollSnapshot | null {
    if (!node) {return null;}
    const distanceToBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
    const containerRect = typeof node.getBoundingClientRect === 'function'
        ? node.getBoundingClientRect()
        : null;
    const anchor = containerRect && anchorConfig
        ? Array.from(node.querySelectorAll<HTMLElement>(anchorConfig.itemSelector))
            .map((item) => ({
                key: item?.dataset?.[anchorConfig.datasetKey] || '',
                rect: typeof item?.getBoundingClientRect === 'function'
                    ? item.getBoundingClientRect()
                    : null,
            }))
            .find((item) => item.key && item.rect && item.rect.bottom >= containerRect.top + 1)
        : null;
    return {
        scrollTop: Number(node.scrollTop || 0),
        nearBottom: distanceToBottom < 80,
        anchorKey: anchor?.key || '',
        anchorTopOffset: anchor?.rect ? anchor.rect.top - containerRect.top : 0,
    };
}

export function restoreElementScrollState(
    node: HTMLElement | null | undefined,
    snapshot: ElementScrollSnapshot | null | undefined,
    anchorConfig?: AnchorConfig | null,
    options: {
        forceBottom?: boolean;
        defaultToBottom?: boolean;
        preserveScrollTop?: boolean;
    } = {},
) {
    if (!node) {return;}
    if (options.forceBottom) {
        node.scrollTop = node.scrollHeight;
        return;
    }
    if (!snapshot) {
        if (options.defaultToBottom !== false) {
            node.scrollTop = node.scrollHeight;
        }
        return;
    }
    if (options.preserveScrollTop) {
        node.scrollTop = Math.min(Math.max(0, snapshot.scrollTop), node.scrollHeight);
        if (snapshot.anchorKey && anchorConfig) {
            const containerRect = typeof node.getBoundingClientRect === 'function'
                ? node.getBoundingClientRect()
                : null;
            const anchorNode = Array.from(node.querySelectorAll<HTMLElement>(anchorConfig.itemSelector))
                .find((item) => item?.dataset?.[anchorConfig.datasetKey] === snapshot.anchorKey);
            const anchorRect = typeof anchorNode?.getBoundingClientRect === 'function'
                ? anchorNode.getBoundingClientRect()
                : null;
            if (containerRect && anchorRect) {
                const nextOffset = anchorRect.top - containerRect.top;
                node.scrollTop = Math.min(
                    Math.max(0, node.scrollTop + nextOffset - Number(snapshot.anchorTopOffset || 0)),
                    node.scrollHeight,
                );
            }
        }
        return;
    }
    node.scrollTop = snapshot.nearBottom
        ? node.scrollHeight
        : Math.min(snapshot.scrollTop, node.scrollHeight);
}
