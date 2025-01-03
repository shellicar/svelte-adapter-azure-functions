# @shellicar/svelte-adapter-azure-functions

[![Azure Functions](https://img.shields.io/badge/Azure%20Functions-v4-0078D4?logo=azure-functions)][azure-functions]
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte)][sveltekit]
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)][typescript]
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60A5FA?logo=biome)][biome]

A [SvelteKit adapter](https://kit.svelte.dev/docs/adapters) that builds your app into an Azure Function.

## Motivation

Looking at the available SvelteKit adapters, there's one for Node.js and a community adapter for Azure Static Web Apps. I wanted to deploy to Azure Functions, so I created this adapter.

## Implementation

The adapter generates a single Azure Function:

```typescript
app.http('server', {
  handler,
  route: '{*url}',
  methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT']
});
```

## Usage

```bash
pnpm add -D @shellicar/svelte-adapter-azure-functions
```

In `svelte.config.js`:
```js
import adapter from '@shellicar/svelte-adapter-azure-functions';

export default {
  kit: {
    adapter: adapter()
  }
};
```

## Configuration

### esbuildOptions

```js
adapter({
  esbuildOptions: {
    minify: false
  }
})
```

Default options in [defaults.ts](./src/defaults.ts):
```typescript
export const defaults = {
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  // ...see defaults.ts for full options
};
```

## Credits

* [svelte-adapter-azure-swa](https://github.com/geoffrich/svelte-adapter-azure-swa)
* [esbuild-azure-functions](https://github.com/beyerleinf/esbuild-azure-functions)

[azure-functions]: https://learn.microsoft.com/azure/azure-functions/functions-reference-node?tabs=typescript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4
[sveltekit]: https://kit.svelte.dev
[typescript]: https://www.typescriptlang.org
[biome]: https://biomejs.dev
