import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/#\//,
        replacement: pathResolve("src") + '/',
      },
      {
        find: /\/@\//,
        replacement: pathResolve("src") + '/',
      },
      {
        find: /\/@\/enums/,
        replacement: pathResolve("src") + "/enums",
      },
      {
        find: /\/@\/types/,
        replacement: pathResolve("src") + "/types",
      },
    ],
    extensions: [".js", ".vue", ".json", ".ts"], // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  plugins: [vue()],
});
