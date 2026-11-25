'use strict';

// Browser and signed runtime share this transport envelope. The installed host
// already forwards /v2/generate-image and /v2/test; provider operations reuse them.
module.exports = Object.freeze({
    generatePath: '/v2/generate-image',
    testPath: '/v2/test',
    generateOperation: 'comfy-cloud-generate',
    testOperation: 'comfy-cloud-test',
    defaultBaseUrl: 'https://cloud.comfy.org',
});
