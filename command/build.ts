import { createRequire } from 'module';
import path from "path";
import commonjs from '@rollup/plugin-commonjs';
const requireds = createRequire(import.meta.url);
const __dirname = path.resolve();


// vite 打包需要的配置
const { defineConfig, build } = requireds('vite');

// vite 插件
const vue = requireds('@vitejs/plugin-vue');
const vueJsx = requireds('@vitejs/plugin-vue-jsx');

// 添加打包入口文件夹 packages（需要手动创建）
const entryDir = path.resolve(__dirname, 'src/mt-form-vue');
// 添加出口文件夹 lib（不需要手动创建，会自动生成）
const outDir = path.resolve(__dirname, 'lib');
// rollup 配置（vite 基于 rollup 打包）
const rollupOptions = {
    target: 'es2015',
    // 这两个库不需要打包
    external: ['vue', 'ant-design-vue', 'vue-json-pretty', '@ant-design/icons-vue'],
    output: {
        globals: {
            vue: 'Vue',
            'ant-design-vue': 'ant-design-vue',
            'vue-json-pretty': 'vue-json-pretty',
            '@ant-design/icons-vue': '@ant-design/icons-vue',
        }
    },
    terserOptions: {
        compress: {
            keep_infinity: true,
            // Used to delete console in production environment
            drop_console: true,
        },
    },
    // Turning off brotliSize display can slightly reduce packaging time
    brotliSize: false,
    chunkSizeWarningLimit: 2000,
};
// vite 配置
const baseConfig = defineConfig({
    configFile: false,
    publicDir: false,
    plugins: [
        vue(),
        vueJsx(),
        commonjs({ requireReturnsDefault: true }),
    ],
    resolve: {
        alias: [
            {
                find: 'vue-i18n',
                replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
            },
            {
                find: /\/#\//,
                replacement: path.resolve("src") + '/',
              },
              {
                find: /\/@\//,
                replacement: path.resolve("src") + '/',
              },
              {
                find: /\/@\/enums/,
                replacement: path.resolve("src") + "/enums",
              },
              {
                find: /\/@\/types/,
                replacement: path.resolve("src") + "/types",
              },
        ],
    },
    css: {
        // 是否提取css生成单独的文件 默认 true
        extract: true,
        // loader配置
        loaderOptions: {},
        modules: {
            // css模块化 文件以.module.[css|less|scss]结尾
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            hashPrefix: 'prefix',
        },
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    build: {
        rollupOptions,
        lib: {
            // 入口
            entry: path.resolve(entryDir, 'index.ts'),
            // 组件库名字
            name: 'mt-form-vue',
            fileName: 'mt-form-vue',
            // 输出格式
            formats: ['es', 'umd'],
            library: 'mt-form-vue',
            libraryTarget: 'umd'
        },
        outDir,
    }
})


/**
 * 全量打包构建的方法
 */
const buildAll = async () => {
    await build({
        ...baseConfig,
    })
};

/**
 * 打包成库
 */
const buildLib = async () => {
    await buildAll();
};

buildLib();