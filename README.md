# ESLint Vue Editor for Slidev

Addon for [Slidev](https://sli.dev/) (Presentation Slides for Developers)

Based on [eslint-editor-vue](https://github.com/ota-meshi/site-kit/tree/main/packages/site-kit-eslint-editor-vue) from [@ota-meshi](https://github.com/ota-meshi)

## Usage

### Install

```bash
npm i slidev-addon-eslint-editor-vue
```

```bash
yarn add slidev-addon-eslint-editor-vue
```

```bash
pnpm add slidev-addon-eslint-editor-vue
```

### Slidev Configuration

Define addon in your slidev addons.

In your slides metadata (using Front Matter):

```md
---
addons:
  - slidev-addon-eslint-editor-vue
---
```

### Vite configuration

```js
// vite.config.js
import { defineConfig, mergeConfig } from "vite"

import eevConfig from "slidev-addon-eslint-editor-vue/vite.config"

const config = defineConfig({
  // your config
})

export default mergeConfig(config, eevConfig)
```

### Use in slides

Usually as any component.

- Can pass code as a code-block.

````md
<ESLintVueEditor :rules="{ ... }">

```vue
<template>
  <div>Hello</div>
</template>
```

</ESLintVueEditor>
````

- Can pass code as a snippet.

```md
<ESLintVueEditor :rules="{ ... }">

<<< @/snippets/code.vue

</ESLintVueEditor>
```

## (Currently) Supported plugins

- [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue)
- [eslint-plugin-vue-scoped-css](https://github.com/future-architect/eslint-plugin-vue-scoped-css)
- [@vkcn/eslint-plugin](https://github.com/levchak0910/vkcn-eslint-plugin)

Need another plugin? Add [your](./components/ESLintVueEditor.vue#L176)
