import path from "node:path"
import { fileURLToPath } from "node:url"

import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      "eslint/use-at-your-own-risk": path.join(
        dirname,
        "./shim/eslint/use-at-your-own-risk.mjs",
      ),
      eslint: path.join(dirname, "./shim/eslint/index.mjs"),
      globby: path.join(dirname, "./shim/globby.mjs"),
      module: path.join(dirname, "./shim/module.mjs"),
      "source-map-js": path.join(dirname, "./shim/source-map-js.mjs"),
      path: path.join(dirname, "./shim/path.mjs"),
      stream: path.join(dirname, "./shim/stream.mjs"),
      buffer: path.join(dirname, "./shim/buffer.mjs"),
      url: path.join(dirname, "./shim/url.mjs"),
      fs: path.join(dirname, "./shim/fs.mjs"),
    },
  },
  define: {
    "process.env.NODE_DEBUG": "false",
  },
  plugins: [
    {
      name: "vite-plugin-slidev-addon-eev-transform-code",
      transform(code) {
        // CJS stuff
        // DEV mode
        code = code.replaceAll("__require.cache", "{}")
        code = code.replaceAll("__require.resolve", "")
        // PROD mode
        code = code.replaceAll("require.cache", "{}")
        code = code.replaceAll("require.resolve", "")

        // In code there is actual espree is used, but `userEspree.version` code still cause error
        code = code.replaceAll("userEspree.version", `"0.1.0"`)

        return code
      },
    },
  ],
})
