<template>
  <div class="eslint-code-container">
    <eslint-editor
      :linter="linter"
      :config="config"
      v-model:code="code"
      :style="{ height: `${height}px` }"
      class="eslint-code-block"
      :filename="filename"
      :language="language"
      :preprocess="preprocess"
      :postprocess="postprocess"
      :format="format"
      :fix="fix"
    />
  </div>
</template>

<script>
import { markRaw } from "vue"
import EslintEditor from "@ota-meshi/site-kit-eslint-editor-vue/ESLintEditor.vue3"

debugger

import * as epVue from "eslint-plugin-vue"
import * as epCss from "eslint-plugin-vue-scoped-css"
import * as epVkcn from "eslint-plugin-vue-kebab-class-naming"

console.log("🚀 ~ epVue:", epVue)
console.log("🚀 ~ epCss:", epCss)
console.log("🚀 ~ epVkcn:", epVkcn)

debugger

export default {
  name: "ESLintCodeBlock",
  components: { EslintEditor },

  props: {
    fix: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Object,
      default() {
        return {}
      },
    },
    filename: {
      type: String,
      default: "example.vue",
    },
    language: {
      type: String,
      default: "html",
    },
    /**
     * If enabled, `@typescript-eslint/parser` will be used.
     * This must be enabled when used for `ts` code blocks.
     */
    typescript: {
      type: Boolean,
      default: false,
    },
    height: {
      type: Number,
      default: 438,
    },
  },

  data() {
    return {
      code: "",
      linter: null,
      preprocess: epVue.processors[".vue"].preprocess,
      postprocess: epVue.processors[".vue"].postprocess,
      format: {
        insertSpaces: true,
        tabSize: 2,
      },
      tsEslintParser: null,
    }
  },

  computed: {
    config() {
      let parser = null // Use default parser (`espree`)
      if (this.typescript) {
        // Use `@typescript-eslint/parser`.
        parser = this.tsEslintParser
      } else if (this.langTs) {
        // Use `@typescript-eslint/parser` only when `<script lang="ts">` or `<script lang="typescript">`.
        parser = {
          ts: this.tsEslintParser,
          typescript: this.tsEslintParser,
        }
      }
      return {
        globals: {
          console: false,
          // ES2015 globals
          ArrayBuffer: false,
          DataView: false,
          Float32Array: false,
          Float64Array: false,
          Int16Array: false,
          Int32Array: false,
          Int8Array: false,
          Map: false,
          Promise: false,
          Proxy: false,
          Reflect: false,
          Set: false,
          Symbol: false,
          Uint16Array: false,
          Uint32Array: false,
          Uint8Array: false,
          Uint8ClampedArray: false,
          WeakMap: false,
          WeakSet: false,
          // ES2017 globals
          Atomics: false,
          SharedArrayBuffer: false,
        },
        rules: this.rules,
        parser: "vue-eslint-parser",
        parserOptions: {
          parser,
          ecmaVersion: "latest",
          sourceType: "module",
          ecmaFeatures: {
            jsx: true,
          },
        },
      }
    },

    /**
     * Checks whether code may be using lang="ts" or lang="typescript".
     * @returns {boolean} If `true`, may be using lang="ts" or lang="typescript".
     */
    langTs() {
      return /lang\s*=\s*(?:"ts"|ts|'ts'|"typescript"|typescript|'typescript')/u.test(
        this.code,
      )
    },
  },

  watch: {
    typescript(value) {
      if (value) {
        this.loadTypescriptESLint()
      }
    },
    langTs(value) {
      if (value) {
        this.loadTypescriptESLint()
      }
    },
  },

  methods: {
    async loadTypescriptESLint() {
      this.tsEslintParser = await import("@typescript-eslint/parser")
    },
  },

  async mounted() {
    const codeNode = findCode(this.$slots.default?.())
    this.code = `${computeCodeFromSlot(codeNode).trim()}\n`

    // Load linter.
    const [{ Linter }, { parseForESLint }] = await Promise.all([
      import("eslint"),
      import("espree").then(() => import("vue-eslint-parser")),
    ])
    if (this.langTs || this.typescript) {
      await this.loadTypescriptESLint()
    }

    const linter = (this.linter = markRaw(new Linter()))

    const supportedPlugins = [
      ["vue", epVue.rules],
      ["vue-scoped-css", epCss.rules],
      ["vue-kebab-class-naming", epVkcn.rules],
    ]

    for (const plugin of supportedPlugins) {
      const [name, rules] = plugin

      for (const ruleId of Object.keys(rules)) {
        linter.defineRule(`${name}/${ruleId}`, rules[ruleId])
      }
    }

    linter.defineParser("vue-eslint-parser", { parseForESLint })
  },
}

/**
 * Find VNode of <code> tag
 */
function findCode(n) {
  const nodes = Array.isArray(n) ? n : [n]
  for (const node of nodes) {
    if (!node) {
      continue
    }

    if (node.type === "code") {
      return node
    }

    if (typeof node.default === "function") {
      return node.default()
    }

    return findCode(node.children)
  }
  return null
}

/**
 * Extract text
 */
function computeCodeFromSlot(n) {
  if (!n) {
    return ""
  }
  const nodes = Array.isArray(n) ? n : [n]
  // debugger
  return nodes
    .map((node) =>
      typeof node === "string" ? node : computeCodeFromSlot(node.children),
    )
    .join("")
}
</script>

<style>
.eslint-code-container {
  border-radius: 6px;
  padding: 1.25rem 0;
  margin: 0;
  background-color: #1e1e1e;
}

.eslint-code-block {
  width: 100%;
}

.eslint-editor-actions {
  bottom: -0.9rem;
}
</style>
