# @shellicar/svelte-adapter-azure-functions

[![npm package](https://img.shields.io/npm/v/@shellicar/svelte-adapter-azure-functions.svg)](https://npmjs.com/package/@shellicar/svelte-adapter-azure-functions)
[![build status](https://github.com/shellicar/svelte-adapter-azure-functions/actions/workflows/node.js.yml/badge.svg)](https://github.com/shellicar/svelte-adapter-azure-functions/actions/workflows/node.js.yml)
[![Azure Functions](https://img.shields.io/badge/Azure%20Functions-v4-0078D4?logo=azure-functions)][azure-functions]
[![SvelteKit](https://img.shields.io/badge/SvelteKit-2-FF3E00?logo=svelte)][sveltekit]
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)][typescript]
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60A5FA?logo=biome)][biome]

A [SvelteKit adapter](https://kit.svelte.dev/docs/adapters) that builds your app into an Azure Function.

## Features

- ⚡ Builds an Azure Function with v4 of the Node.js programming model
- 🔐 Passes Azure Function's [ClientPrincipal] to server routes
- 🛠️ Passes Azure Function's [InvocationContext] to server routes
- 📦 Zero configuration required

## Installation & Quick Start

```sh
npm i --save @shellicar/svelte-adapter-azure-functions
```

```sh
pnpm add @shellicar/svelte-adapter-azure-functions
```

```js
// svelte.config.js
import adapter from '@shellicar/svelte-adapter-azure-functions';

export default {
  kit: {
    adapter: adapter()
  }
};
```

<!-- BEGIN_ECOSYSTEM -->

## @shellicar TypeScript Ecosystem

### Core Libraries

- [`@shellicar/core-config`](https://github.com/shellicar/core-config) - A library for securely handling sensitive configuration values like connection strings, URLs, and secrets.
- [`@shellicar/core-di`](https://github.com/shellicar/core-di) - A basic dependency injection library.
- [`@shellicar/core-foundation`](https://github.com/shellicar/core-foundation) - A comprehensive starter repository.

### Build Tools

- [`@shellicar/build-version`](https://github.com/shellicar/build-version) - Build plugin that calculates and exposes version information through a virtual module import.
- [`@shellicar/build-graphql`](https://github.com/shellicar/build-graphql) - Build plugin that loads GraphQL files and makes them available through a virtual module import.

### Framework Adapters

- [`@shellicar/svelte-adapter-azure-functions`](https://github.com/shellicar/svelte-adapter-azure-functions) - A [SvelteKit adapter](https://kit.svelte.dev/docs/adapters) that builds your app into an Azure Function.

### Logging & Monitoring

- [`@shellicar/winston-azure-application-insights`](https://github.com/shellicar/winston-azure-application-insights) - An [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) transport for [Winston](https://github.com/winstonjs/winston) logging library.
- [`@shellicar/pino-applicationinsights-transport`](https://github.com/shellicar/pino-applicationinsights-transport) - [Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights) transport for [pino](https://github.com/pinojs/pino)

<!-- END_ECOSYSTEM -->

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

## Output

```text
build/
├── server/
│   ├── dist/            # Server-side app
│   │   ├── *.mjs        # Server-side chunks and routes
│   │   └── trigger.mjs  # Azure Function HTTP trigger
│   ├── host.json        # Function configuration
│   └── package.json     # Function dependencies
└── static/
    └── _app/            # Client-side assets
```

## Credits

- [svelte-adapter-azure-swa]
- [esbuild-azure-functions]

[azure-functions]: https://learn.microsoft.com/azure/azure-functions/functions-reference-node?tabs=typescript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4
[sveltekit]: https://kit.svelte.dev
[typescript]: https://www.typescriptlang.org
[biome]: https://biomejs.dev

[svelte-adapter-azure-swa]: https://github.com/geoffrich/svelte-adapter-azure-swa
[esbuild-azure-functions]: https://github.com/beyerleinf/esbuild-azure-functions
[InvocationContext]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=javascript%2Cwindows%2Cazure-cli&pivots=nodejs-model-v4#invocation-context
[ClientPrincipal]: https://learn.microsoft.com/en-us/azure/app-service/configure-authentication-user-identities#decoding-the-client-principal-header
