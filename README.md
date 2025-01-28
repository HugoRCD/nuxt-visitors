# Nuxt Active Users

<!-- automd:badges color=black license provider=shields name=nuxt-visitors -->

[![npm version](https://img.shields.io/npm/v/nuxt-visitors?color=black)](https://npmjs.com/package/nuxt-visitors)
[![npm downloads](https://img.shields.io/npm/dm/nuxt-visitors?color=black)](https://npm.chart.dev/nuxt-visitors)
[![license](https://img.shields.io/github/license/HugoRCD/nuxt-visitors?color=black)](https://github.com/HugoRCD/nuxt-visitors/blob/main/LICENSE)

<!-- /automd -->

Add live visitor counting to your Nuxt website in seconds. WebSocket-based, type-safe, and completely automatic.

## Features ⚡️

- 🔄 Real-time updates via WebSocket
- 🪄 Zero configuration needed
- 🛠 Automatic connection management
- 📊 Type-safe composable
- 🧹 Auto cleanup on unmount

## Installation

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-visitors
```

<!-- automd:pm-install name="nuxt-visitors" -->

```sh
# ✨ Auto-detect
npx nypm install nuxt-visitors

# npm
npm install nuxt-visitors

# yarn
yarn add nuxt-visitors

# pnpm
pnpm install nuxt-visitors

# bun
bun install nuxt-visitors

# deno
deno install nuxt-visitors
```

<!-- /automd -->

## Usage

```vue
<script setup lang="ts">
const { visitors } = useVisitors()
</script>

<template>
  <div>Active users: {{ visitors }}</div>
</template>
```

That's it! The module handles everything else automatically:
- WebSocket connection management
- Real-time updates
- Reconnection logic
- Error handling

### Advanced usage

The composable provides additional features:
```ts
const {
visitors,     // Ref<number> - Current visitor count
isConnected,  // Ref<boolean> - Connection status
isLoading,    // Ref<boolean> - Loading state
error,        // Ref<string | null> - Error message if any
reconnect     // () => void - Manual reconnection
} = useVisitors()
```

<!-- automd:fetch url="gh:hugorcd/markdown/main/src/contributions.md" -->

## Contributing
To start contributing, you can follow these steps:

1. First raise an issue to discuss the changes you would like to make.
2. Fork the repository.
3. Create a branch using conventional commits and the issue number as the branch name. For example, `feat/123` or `fix/456`.
4. Make changes following the local development steps.
5. Commit your changes following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
6. If your changes affect the code, run tests using `bun run test`.
7. Create a pull request following the [Pull Request Template](https://github.com/HugoRCD/markdown/blob/main/src/pull_request_template.md).
   - To be merged, the pull request must pass the tests/workflow and have at least one approval.
   - If your changes affect the documentation, make sure to update it.
   - If your changes affect the code, make sure to update the tests.
8. Wait for the maintainers to review your pull request.
9. Once approved, the pull request will be merged in the next release !

<!-- /automd -->

<!-- automd:contributors license=Apache author=HugoRCD github=HugoRCD/nuxt-visitors -->

Published under the [APACHE](https://github.com/HugoRCD/nuxt-visitors/blob/main/LICENSE) license.
Made by [@HugoRCD](https://github.com/HugoRCD) and [community](https://github.com/HugoRCD/nuxt-visitors/graphs/contributors) 💛
<br><br>
<a href="https://github.com/HugoRCD/nuxt-visitors/graphs/contributors">
<img src="https://contrib.rocks/image?repo=HugoRCD/nuxt-visitors" />
</a>

<!-- /automd -->

<!-- automd:with-automd lastUpdate -->

---

_🤖 auto updated with [automd](https://automd.unjs.io) (last updated: Tue Jan 28 2025)_

<!-- /automd -->
