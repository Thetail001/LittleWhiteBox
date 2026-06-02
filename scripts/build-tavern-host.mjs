import { build } from 'esbuild';

await build({
    entryPoints: [
        'modules/tavern/tavern.ts',
        'modules/tavern/host/agent-config.ts',
        'modules/tavern/host/chat-presets.ts',
        'modules/tavern/host/sillytavern-context.ts',
    ],
    outbase: 'modules/tavern',
    outdir: 'modules/tavern',
    format: 'esm',
    target: 'es2022',
    bundle: false,
    sourcemap: false,
    banner: {
        js: '/* eslint-disable -- generated from TypeScript source; run npm run build:tavern */',
    },
});
