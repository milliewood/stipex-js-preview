import { defineConfig } from "tsup";

export default defineConfig({
    format: ['cjs', 'esm'],
    entry: ['./src/stipex.ts'],
    dts: true,
    shims: true,
    skipNodeModulesBundle: true,
    clean: true,
})