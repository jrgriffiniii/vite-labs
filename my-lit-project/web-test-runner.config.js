import {legacyPlugin} from '@web/dev-server-legacy';
import {esbuildPlugin} from '@web/dev-server-esbuild';

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
const mode = process.env.MODE || 'dev';
if (!['dev', 'prod'].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

export default {
  rootDir: '.',
  files: ['./test/**/*.test.ts'],
  nodeResolve: {exportConditions: mode === 'dev' ? ['development'] : []},
  coverage: true,
  preserveSymlinks: true,
  plugins: [
    esbuildPlugin({ ts: true }),
    // Detect browsers without modules (e.g. IE11) and transform to SystemJS
    // (https://modern-web.dev/docs/dev-server/plugins/legacy/).
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        // Inject lit's polyfill-support module into test files, which is required
        // for interfacing with the webcomponents polyfills
        custom: [
          {
            name: 'lit-polyfill-support',
            path: 'node_modules/lit/polyfill-support.js',
            test: "!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || window.ShadyDOM && window.ShadyDOM.force",
            module: false,
          },
        ],
      },
    })
  ],
};
