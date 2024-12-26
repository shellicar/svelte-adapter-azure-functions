import { writeFileSync } from 'node:fs';
import { join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Adapter, Builder } from '@sveltejs/kit';
import { type BuildOptions, build } from 'esbuild';

export interface AzureFunctionsAdapterOptions {
  esbuildOptions?: BuildOptions;
  debug?: boolean;
}

export const createAdapter = (options: AzureFunctionsAdapterOptions = {}): Adapter => {
  return {
    name: 'adapter-azure-functions',
    async adapt(builder: Builder) {
      const { esbuildOptions = {} } = options;
      const buildDir = 'build';
      const tmp = builder.getBuildDirectory('adapter-azure-functions');
      const serverDir = join(buildDir, 'server');
      const staticDir = join(buildDir, 'static');

      builder.rimraf(buildDir);
      builder.rimraf(tmp);

      builder.writeClient(staticDir);
      builder.writePrerendered(staticDir);

      const distFiles = fileURLToPath(new URL('../dist', import.meta.url));

      const relativePath = posix.relative(tmp, join(builder.getServerDirectory()));
      builder.copy(distFiles, tmp, {
        replace: {
          MANIFEST: './manifest.js',
          SERVER: `${relativePath}/index.js`,
          SHIMS: './shims.js',
        },
      });

      writeFileSync(`${tmp}/manifest.js`, `export const manifest = ${builder.generateManifest({ relativePath })};\n`);
      await build({
        entryPoints: [`${tmp}/trigger.js`],
        outdir: join(serverDir, 'dist'),
        bundle: true,
        platform: 'node',
        target: 'node20',
        treeShaking: true,
        format: 'esm',
        splitting: true,
        minify: true,
        keepNames: true,
        sourcemap: true,
        outExtension: { '.js': '.mjs' },
        ...esbuildOptions,
      });

      const copyFiles = fileURLToPath(new URL('../files', import.meta.url));
      console.log('copy', copyFiles, 'to', serverDir);
      builder.copy(copyFiles, serverDir);
    },
  };
};
