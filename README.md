# @shellicar/svelte-adapter-azure-functions

[Adapter](https://svelte.dev/docs/kit/adapters) for SvelteKit apps that creates an Azure Function.

## Motivation

Looking at the available SvelteKit adapters, there's one for Node.js and a community adapter for Azure Static Web Apps. I wanted to deploy to Azure Functions, so I created this adapter.

## Installation

```bash
pnpm add -D @shellicar/svelte-adapter-azure-functions
```

## Usage

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

Default options in [defaults.ts](./src/defaults.ts).

## Credits

* [svelte-adapter-azure-swa](https://github.com/geoffrich/svelte-adapter-azure-swa)
* [esbuild-azure-functions](https://github.com/beyerleinf/esbuild-azure-functions)
