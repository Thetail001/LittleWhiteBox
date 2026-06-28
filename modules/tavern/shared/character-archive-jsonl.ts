import type {
    TavernCharacterArchivePartManifest,
    TavernCharacterArchiveRecord,
} from './character-archive-types';

const DEFAULT_TARGET_PART_RAW_BYTES = 64 * 1024 * 1024;
const DEFAULT_FORCE_PART_RAW_BYTES = 128 * 1024 * 1024;
const DEFAULT_PARSE_CHUNK_BYTES = 1024 * 1024;

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export interface TavernCharacterArchiveJsonlCodec {
    gzip(bytes: Uint8Array): Promise<Uint8Array>;
    ungzip(bytes: Uint8Array): Promise<Uint8Array>;
}

export interface TavernCharacterArchiveWriterOptions {
    archiveId: string;
    targetRawBytes?: number;
    forceRawBytes?: number;
    codec?: TavernCharacterArchiveJsonlCodec;
    filenameForPart: (index: number) => string;
    uploadPart: (input: {
        index: number;
        filename: string;
        bytes: Uint8Array;
        rawBytes: number;
        rowCount: number;
        sha256: string;
    }) => Promise<void>;
    onPartFlushed?: (part: TavernCharacterArchivePartManifest) => void;
}

export interface TavernCharacterArchiveWriterResult {
    parts: TavernCharacterArchivePartManifest[];
    rawBytes: number;
    rowCount: number;
}

export function encodeTavernCharacterArchiveRecord(record: TavernCharacterArchiveRecord): Uint8Array {
    return textEncoder.encode(`${JSON.stringify(record)}\n`);
}

function parseTavernCharacterArchiveJsonlLine(line = ''): TavernCharacterArchiveRecord | null {
    const trimmed = line.trim();
    if (!trimmed) {return null;}
    const parsed = JSON.parse(trimmed) as TavernCharacterArchiveRecord;
    if (!parsed || typeof parsed !== 'object' || typeof parsed.table !== 'string' || !('record' in parsed)) {
        throw new Error('archive_jsonl_record_invalid');
    }
    return parsed;
}

export function* parseTavernCharacterArchiveJsonlBatches(
    bytes: Uint8Array,
    batchSize = 500,
    chunkBytes = DEFAULT_PARSE_CHUNK_BYTES,
): Iterable<TavernCharacterArchiveRecord[]> {
    const size = Math.max(1, Math.floor(Number(batchSize) || 500));
    const chunkSize = Math.max(1, Math.floor(Number(chunkBytes) || DEFAULT_PARSE_CHUNK_BYTES));
    let batch: TavernCharacterArchiveRecord[] = [];
    let pendingLine = '';
    const decoder = new TextDecoder();
    const pushLine = function* (line: string): Iterable<TavernCharacterArchiveRecord[]> {
        const parsed = parseTavernCharacterArchiveJsonlLine(line);
        if (!parsed) {return;}
        batch.push(parsed);
        if (batch.length >= size) {
            yield batch;
            batch = [];
        }
    };
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
        const text = decoder.decode(bytes.subarray(offset, Math.min(offset + chunkSize, bytes.length)), { stream: true });
        let start = 0;
        while (start <= text.length) {
            const newlineIndex = text.indexOf('\n', start);
            if (newlineIndex === -1) {
                pendingLine += text.slice(start);
                break;
            }
            const line = pendingLine + text.slice(start, newlineIndex);
            pendingLine = '';
            for (const readyBatch of pushLine(line)) {
                yield readyBatch;
            }
            start = newlineIndex + 1;
        }
    }
    const tail = decoder.decode();
    if (tail) {
        pendingLine += tail;
    }
    if (pendingLine) {
        for (const readyBatch of pushLine(pendingLine)) {
            yield readyBatch;
        }
    }
    if (batch.length) {
        yield batch;
    }
}

export function parseTavernCharacterArchiveJsonl(bytes: Uint8Array): TavernCharacterArchiveRecord[] {
    const rows: TavernCharacterArchiveRecord[] = [];
    for (const batch of parseTavernCharacterArchiveJsonlBatches(bytes)) {
        rows.push(...batch);
    }
    return rows;
}

export async function gzipTavernArchiveBytes(bytes: Uint8Array): Promise<Uint8Array> {
    const CompressionStreamConstructor = globalThis.CompressionStream;
    if (typeof CompressionStreamConstructor !== 'function') {
        throw new Error('compression_stream_unavailable');
    }
    const stream = new Blob([bytesToArrayBuffer(bytes)]).stream().pipeThrough(new CompressionStreamConstructor('gzip'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function ungzipTavernArchiveBytes(bytes: Uint8Array): Promise<Uint8Array> {
    const DecompressionStreamConstructor = globalThis.DecompressionStream;
    if (typeof DecompressionStreamConstructor !== 'function') {
        throw new Error('decompression_stream_unavailable');
    }
    const stream = new Blob([bytesToArrayBuffer(bytes)]).stream().pipeThrough(new DecompressionStreamConstructor('gzip'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
}

export const browserTavernCharacterArchiveJsonlCodec: TavernCharacterArchiveJsonlCodec = {
    gzip: gzipTavernArchiveBytes,
    ungzip: ungzipTavernArchiveBytes,
};

export function bytesToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
    return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
    if (!globalThis.crypto?.subtle) {
        throw new Error('crypto_subtle_unavailable');
    }
    const digest = await globalThis.crypto.subtle.digest('SHA-256', bytesToArrayBuffer(bytes));
    return Array.from(new Uint8Array(digest))
        .map((value) => value.toString(16).padStart(2, '0'))
        .join('');
}

export function bytesToBase64(bytes: Uint8Array): string {
    let binary = '';
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
        const chunk = bytes.subarray(index, Math.min(index + chunkSize, bytes.length));
        binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
}

export function base64ToBytes(value = ''): Uint8Array {
    const binary = atob(String(value || ''));
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
}

export function textToBytes(value = ''): Uint8Array {
    return textEncoder.encode(String(value || ''));
}

export function bytesToText(bytes: Uint8Array): string {
    return textDecoder.decode(bytes);
}

function concatByteChunks(chunks: Uint8Array[], totalBytes: number): Uint8Array {
    const bytes = new Uint8Array(totalBytes);
    let offset = 0;
    for (const chunk of chunks) {
        bytes.set(chunk, offset);
        offset += chunk.length;
    }
    return bytes;
}

export class TavernCharacterArchiveWriter {
    private readonly targetRawBytes: number;
    private readonly forceRawBytes: number;
    private readonly codec: TavernCharacterArchiveJsonlCodec;
    private readonly filenameForPart: TavernCharacterArchiveWriterOptions['filenameForPart'];
    private readonly uploadPart: TavernCharacterArchiveWriterOptions['uploadPart'];
    private readonly onPartFlushed?: TavernCharacterArchiveWriterOptions['onPartFlushed'];
    private chunks: Uint8Array[] = [];
    private currentRawBytes = 0;
    private currentRowCount = 0;
    private nextPartIndex = 1;
    private totalRawBytes = 0;
    private totalRowCount = 0;
    private closed = false;
    readonly archiveId: string;
    readonly parts: TavernCharacterArchivePartManifest[] = [];

    constructor(options: TavernCharacterArchiveWriterOptions) {
        this.archiveId = String(options.archiveId || '').trim();
        this.targetRawBytes = Math.max(1, Math.floor(Number(options.targetRawBytes) || DEFAULT_TARGET_PART_RAW_BYTES));
        this.forceRawBytes = Math.max(this.targetRawBytes, Math.floor(Number(options.forceRawBytes) || DEFAULT_FORCE_PART_RAW_BYTES));
        this.codec = options.codec || browserTavernCharacterArchiveJsonlCodec;
        this.filenameForPart = options.filenameForPart;
        this.uploadPart = options.uploadPart;
        this.onPartFlushed = options.onPartFlushed;
    }

    async write(record: TavernCharacterArchiveRecord): Promise<void> {
        if (this.closed) {throw new Error('archive_writer_closed');}
        const row = encodeTavernCharacterArchiveRecord(record);
        if (this.currentRowCount > 0 && this.currentRawBytes >= this.targetRawBytes) {
            await this.flush();
        }
        this.chunks.push(row);
        this.currentRawBytes += row.length;
        this.currentRowCount += 1;
        this.totalRawBytes += row.length;
        this.totalRowCount += 1;
        if (this.currentRawBytes >= this.forceRawBytes) {
            await this.flush();
        }
    }

    async flush(): Promise<TavernCharacterArchivePartManifest | null> {
        if (!this.currentRowCount) {return null;}
        const index = this.nextPartIndex;
        const filename = this.filenameForPart(index);
        const rawBytes = concatByteChunks(this.chunks, this.currentRawBytes);
        const compressed = await this.codec.gzip(rawBytes);
        const sha256 = await sha256Hex(compressed);
        const part = {
            index,
            filename,
            rowCount: this.currentRowCount,
            rawBytes: rawBytes.length,
            compressedBytes: compressed.length,
            sha256,
        };
        await this.uploadPart({
            index,
            filename,
            bytes: compressed,
            rawBytes: rawBytes.length,
            rowCount: this.currentRowCount,
            sha256,
        });
        this.parts.push(part);
        this.onPartFlushed?.(part);
        this.nextPartIndex += 1;
        this.chunks = [];
        this.currentRawBytes = 0;
        this.currentRowCount = 0;
        return part;
    }

    async close(): Promise<TavernCharacterArchiveWriterResult> {
        if (!this.closed) {
            await this.flush();
            this.closed = true;
        }
        return {
            parts: [...this.parts],
            rawBytes: this.totalRawBytes,
            rowCount: this.totalRowCount,
        };
    }
}
