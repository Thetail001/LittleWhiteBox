import { saveTavernMemorySnapshot } from './memory-files';
import { resolveAcceptedSnapshotFloor, saveTavernTaskSnapshot, TAVERN_TASK_BASELINE_FLOOR } from './tasks';

export async function saveAcceptedStateSnapshot(sessionId = '', floorInput?: number): Promise<{
    floor: number;
    memorySnapshotSaved: boolean;
    taskSnapshotSaved: boolean;
}> {
    const id = String(sessionId || '').trim();
    if (!id) {
        return {
            floor: TAVERN_TASK_BASELINE_FLOOR,
            memorySnapshotSaved: false,
            taskSnapshotSaved: false,
        };
    }
    const floor = await resolveAcceptedSnapshotFloor(id, floorInput);
    const memorySnapshot = await saveTavernMemorySnapshot(id, floor);
    const taskSnapshot = await saveTavernTaskSnapshot(id, floor);
    return {
        floor,
        memorySnapshotSaved: !!memorySnapshot,
        taskSnapshotSaved: !!taskSnapshot,
    };
}

