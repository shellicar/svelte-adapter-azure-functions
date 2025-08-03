import { defineConfig } from 'tsup';

export default defineConfig((config) => ({
  entry: ['src/**/*.ts'],
  splitting: true,
  sourcemap: true,
  dts: true,
  clean: true,
  minify: config.watch ? false : 'terser',
  keepNames: true,
  bundle: true,
  cjsInterop: true,
  removeNodeProtocol: true,
  external: ['@azure/functions-core', 'SHIMS', 'MANIFEST', 'SERVER', 'esbuild'],
  inject: ['cjs-shim.mts'],
  tsconfig: 'tsconfig.json',
  target: 'node20',
  format: ['esm'],
  outDir: 'dist',
  ...config,
}));
