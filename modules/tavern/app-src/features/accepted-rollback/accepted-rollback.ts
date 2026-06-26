import {
    describeTavernMemoryRestoreImpact,
    rebuildTavernMemoryDerivedIndex,
    restoreTavernMemoryToFloor,
    trimTavernMemorySnapshotsFromFloor,
} from '../../../shared/memory-files';
import {
    describeTavernTaskRestoreImpact,
    restoreTavernTasksToFloor,
    trimTavernTaskSnapshotsFromFloor,
} from '../../../shared/tasks';
import {
    cancelAndRollbackXbTavernManagersForMessageRange,
    describeXbTavernManagerRollbackImpactForMessageRange,
} from '../../runtime/manager';

export type AcceptedStateRollbackImpact = {
    targetFloor: number;
    memory: { changed: boolean; currentFileCount: number; targetFileCount: number; changedPaths: string[] };
    tasks: { changed: boolean; currentTaskCount: number; targetTaskCount: number };
    managers: {
        affectedRuns: number;
        pendingRuns: number;
        writtenMemoryFiles: number;
        writtenTaskRuns: number;
        hasWrittenState: boolean;
    };
    willRollbackState: boolean;
    willCancelWork: boolean;
};

export async function cancelAcceptedRollbackManagersBeforeMessage(sessionId = '', changedOrder = 0) {
    return cancelAndRollbackXbTavernManagersForMessageRange(sessionId, changedOrder);
}

export async function restoreAcceptedMemoryAndTaskStateBeforeMessage(sessionId = '', changedOrder = 0) {
    const id = String(sessionId || '').trim();
    const order = Number(changedOrder);
    if (!id || !Number.isFinite(order)) {return;}
    await restoreTavernMemoryToFloor(id, order - 1);
    await restoreTavernTasksToFloor(id, order - 1);
    await trimTavernMemorySnapshotsFromFloor(id, order);
    await trimTavernTaskSnapshotsFromFloor(id, order);
    await rebuildTavernMemoryDerivedIndex(id);
}

export async function describeAcceptedStateRollbackImpact(sessionId: string, changedOrder: number): Promise<AcceptedStateRollbackImpact> {
    const targetFloor = Number(changedOrder) - 1;
    const [memory, tasks, managers] = await Promise.all([
        describeTavernMemoryRestoreImpact(sessionId, targetFloor),
        describeTavernTaskRestoreImpact(sessionId, targetFloor),
        describeXbTavernManagerRollbackImpactForMessageRange(sessionId, changedOrder),
    ]);
    return {
        targetFloor,
        memory,
        tasks,
        managers,
        willRollbackState: memory.changed || tasks.changed,
        willCancelWork: managers.pendingRuns > 0,
    };
}

function rollbackImpactTargetLabel(targetFloor: number): string {
    return targetFloor >= 0 ? `第 ${targetFloor + 1} 楼后的状态` : '开局前状态';
}

export function rollbackImpactLines(impact: AcceptedStateRollbackImpact): string[] {
    const target = rollbackImpactTargetLabel(impact.targetFloor);
    const lines: string[] = [];
    if (impact.memory.changed && impact.tasks.changed) {
        lines.push(`会话记忆和事件线索会恢复到${target}。`);
    } else if (impact.memory.changed) {
        lines.push(`会话记忆会恢复到${target}。`);
    } else if (impact.tasks.changed) {
        lines.push(`事件线索会恢复到${target}。`);
    }
    if (impact.managers.pendingRuns) {
        lines.push(`将取消 ${impact.managers.pendingRuns} 个尚未执行的后台维护。`);
    }
    return lines;
}
