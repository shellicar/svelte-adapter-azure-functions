import escapeStringRegexp from 'escape-string-regexp';
import { defineConfig } from 'tsup';

const excludeFromBundle = ['@azure/functions-core', 'MANIFEST', 'SERVER', 'SHIMS', 'esbuild'].map(escapeStringRegexp);
const noExternal = [new RegExp(`^(?!(${excludeFromBundle.join('|')})$)`)];

export default defineConfig((config) => ({
  entry: ['src/**/*.ts'],
  splitting: true,
  sourcemap: true,
  dts: true,
  clean: true,
  minify: config.watch ? false : 'terser',
  keepNames: true,
  bundle: true,
  noExternal,
  inject: ['cjs-shim.mts'],
  tsconfig: 'tsconfig.json',
  target: 'node20',
  format: ['esm', 'cjs'],
  outDir: 'dist',
  ...config,
}));
