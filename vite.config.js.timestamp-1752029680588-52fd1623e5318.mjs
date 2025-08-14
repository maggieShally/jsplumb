// vite.config.js
import eslint from "file:///E:/others/jsplumb-test/node_modules/vite-plugin-eslint/dist/index.mjs";
import vue from "file:///E:/others/jsplumb-test/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///E:/others/jsplumb-test/node_modules/vite/dist/node/index.js";
import path from "path";
var __vite_injected_original_dirname = "E:\\others\\jsplumb-test";
debugger;
debugger;
var vite_config_default = defineConfig(({ mode, command }) => {
  return {
    // configureWebpack: config => {
    //   // 添加如下代码
    //   if (process.env.NODE_ENV === 'production') {
    //     config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    //   }
    //   const resolve = {
    //     alias: {
    //       vue: 'vue/dist/vue.esm-bundler.js',
    //     },
    //   }
    //   return {
    //     resolve,
    //     // externals: {
    //     //   vue: 'Vue'
    //     // },
    //     module: {
    //       rules: [
    //         {
    //           test: /\.mjs$/,
    //           include: /node_modules/,
    //           type: 'javascript/auto',
    //         },
    //         {
    //           test: /\.tsx?$/,
    //           use: 'ts-loader',
    //           exclude: /node_modules/,
    //         },
    //       ],
    //     },
    //     plugins: [
    //       new UselessFile({
    //         // 性能优化 ：删除项目中没有引用关系的文件
    //         root: './src', // 项目目录
    //         out: './fileList.json', // 输出文件列表
    //         clean: false, // 是否删除文件,
    //         exclude: /node_modules/, // 排除文件列表
    //       }),
    //       new CompressionPlugin({
    //         test: /\.(js|css|html)$/, // 匹配文件名
    //         threshold: 10240,
    //       }),
    //     ],
    //   }
    // },
    build: {
      minify: false,
      rollupOptions: {
        output: {
          // 打包输出的配置
          manualChunks: (id) => {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        // 设置路径
        "~": path.resolve(__vite_injected_original_dirname, "./"),
        // 设置别名
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    plugins: [
      vue()
      // eslint(),
      // [
      //   eslint({
      //     failOnWarning: false,
      //     failOnError: false,
      //   }),
      // ],
      // ...createVitePlugins(),
      // new UselessFile({
      //   // 性能优化 ：删除项目中没有引用关系的文件
      //   root: './src', // 项目目录
      //   out: './fileList.json', // 输出文件列表
      //   clean: false, // 是否删除文件,
      //   exclude: /node_modules/, // 排除文件列表
      // }),
      // new CompressionPlugin({
      //   test: /\.(js|css|html)$/, // 匹配文件名
      //   threshold: 10240,
      // }),
    ],
    pages: {
      index: {
        entry: "src/main.js",
        template: "public/index.html",
        filename: "index.html"
        // chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      viewPanel: "src/viewPanel.js"
      // viewPanel: {
      //   entry: './src/viewPanel.js',
      //   template: 'public/viewPanel.html',
      //   filename: 'viewPanel.html',
      // }
    },
    runtimeCompiler: true,
    server: {
      host: "0.0.0.0",
      port: "8087",
      https: false,
      open: true,
      proxy: {
        "^/ds/": {
          target: "http://dopuat.longsys.com",
          // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        },
        "^/da/": {
          target: "http://dopuat.longsys.com",
          // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        },
        "^/dl/": {
          target: "http://dopuat.longsys.com",
          // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        },
        "^/dea/": {
          target: "http://dopuat.longsys.com",
          // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        },
        "^/bub/": {
          target: "http://dopuat.longsys.com",
          // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        },
        "^/dpr/": {
          target: "http://dopuat.longsys.com",
          // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        },
        "^/docr/": {
          target: "http://10.11.12.236:8280",
          // '代理目标的基础路径'
          // target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true
          // 支持跨域
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__vite_injected_original_dirname, "src/assets/variable.less")}";`
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxvdGhlcnNcXFxcanNwbHVtYi10ZXN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxvdGhlcnNcXFxcanNwbHVtYi10ZXN0XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9vdGhlcnMvanNwbHVtYi10ZXN0L3ZpdGUuY29uZmlnLmpzXCI7LypcclxuICogQERlc2NyaXB0aW9uOlxyXG4gKiBARGF0ZTogMjAyMS0wNy0yMSAxMToxODo1MVxyXG4gKiBATGFzdEVkaXRUaW1lOiAyMDI0LTExLTA4IDEwOjE0OjI1XHJcbiAqIEBGaWxlUGF0aDogXFx3ZWJwYWNrLXRlc3RlOlxcb3RoZXJzXFxqc3BsdW1iLXRlc3RcXHZpdGUuY29uZmlnLmpzXHJcbiAqL1xyXG4vLyBjb25zdCBDb21wcmVzc2lvblBsdWdpbiA9IHJlcXVpcmUoJ2NvbXByZXNzaW9uLXdlYnBhY2stcGx1Z2luJylcclxuXHJcbmltcG9ydCBlc2xpbnQgZnJvbSAndml0ZS1wbHVnaW4tZXNsaW50JyAgXHJcblxyXG5kZWJ1Z2dlclxyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIlxyXG5kZWJ1Z2dlclxyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuLy8gaW1wb3J0IGNyZWF0ZVZpdGVQbHVnaW5zIGZyb20gJy4vcGx1Z2lucydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlLCBjb21tYW5kIH0pID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgLy8gY29uZmlndXJlV2VicGFjazogY29uZmlnID0+IHtcclxuICAgIC8vICAgLy8gXHU2REZCXHU1MkEwXHU1OTgyXHU0RTBCXHU0RUUzXHU3ODAxXHJcbiAgICAvLyAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XHJcbiAgICAvLyAgICAgY29uZmlnLm9wdGltaXphdGlvbi5taW5pbWl6ZXJbMF0ub3B0aW9ucy50ZXJzZXJPcHRpb25zLmNvbXByZXNzLmRyb3BfY29uc29sZSA9IHRydWVcclxuICAgIC8vICAgfVxyXG4gICAgLy8gICBjb25zdCByZXNvbHZlID0ge1xyXG4gICAgLy8gICAgIGFsaWFzOiB7XHJcbiAgICAvLyAgICAgICB2dWU6ICd2dWUvZGlzdC92dWUuZXNtLWJ1bmRsZXIuanMnLFxyXG4gICAgLy8gICAgIH0sXHJcbiAgICAvLyAgIH1cclxuICAgIC8vICAgcmV0dXJuIHtcclxuICAgIC8vICAgICByZXNvbHZlLFxyXG4gICAgLy8gICAgIC8vIGV4dGVybmFsczoge1xyXG4gICAgLy8gICAgIC8vICAgdnVlOiAnVnVlJ1xyXG4gICAgLy8gICAgIC8vIH0sXHJcbiAgICAvLyAgICAgbW9kdWxlOiB7XHJcbiAgICAvLyAgICAgICBydWxlczogW1xyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgdGVzdDogL1xcLm1qcyQvLFxyXG4gICAgLy8gICAgICAgICAgIGluY2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxyXG4gICAgLy8gICAgICAgICAgIHR5cGU6ICdqYXZhc2NyaXB0L2F1dG8nLFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICB7XHJcbiAgICAvLyAgICAgICAgICAgdGVzdDogL1xcLnRzeD8kLyxcclxuICAgIC8vICAgICAgICAgICB1c2U6ICd0cy1sb2FkZXInLFxyXG4gICAgLy8gICAgICAgICAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLFxyXG4gICAgLy8gICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgXSxcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIHBsdWdpbnM6IFtcclxuICAgIC8vICAgICAgIG5ldyBVc2VsZXNzRmlsZSh7XHJcbiAgICAvLyAgICAgICAgIC8vIFx1NjAyN1x1ODBGRFx1NEYxOFx1NTMxNiBcdUZGMUFcdTUyMjBcdTk2NjRcdTk4NzlcdTc2RUVcdTRFMkRcdTZDQTFcdTY3MDlcdTVGMTVcdTc1MjhcdTUxNzNcdTdDRkJcdTc2ODRcdTY1ODdcdTRFRjZcclxuICAgIC8vICAgICAgICAgcm9vdDogJy4vc3JjJywgLy8gXHU5ODc5XHU3NkVFXHU3NkVFXHU1RjU1XHJcbiAgICAvLyAgICAgICAgIG91dDogJy4vZmlsZUxpc3QuanNvbicsIC8vIFx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTIxN1x1ODg2OFxyXG4gICAgLy8gICAgICAgICBjbGVhbjogZmFsc2UsIC8vIFx1NjYyRlx1NTQyNlx1NTIyMFx1OTY2NFx1NjU4N1x1NEVGNixcclxuICAgIC8vICAgICAgICAgZXhjbHVkZTogL25vZGVfbW9kdWxlcy8sIC8vIFx1NjM5Mlx1OTY2NFx1NjU4N1x1NEVGNlx1NTIxN1x1ODg2OFxyXG4gICAgLy8gICAgICAgfSksXHJcbiAgICAvLyAgICAgICBuZXcgQ29tcHJlc3Npb25QbHVnaW4oe1xyXG4gICAgLy8gICAgICAgICB0ZXN0OiAvXFwuKGpzfGNzc3xodG1sKSQvLCAvLyBcdTUzMzlcdTkxNERcdTY1ODdcdTRFRjZcdTU0MERcclxuICAgIC8vICAgICAgICAgdGhyZXNob2xkOiAxMDI0MCxcclxuICAgIC8vICAgICAgIH0pLFxyXG4gICAgLy8gICAgIF0sXHJcbiAgICAvLyAgIH1cclxuICAgIC8vIH0sXHJcbiAgXHJcbiAgICBidWlsZDogeyAgXHJcbiAgICAgIG1pbmlmeTogZmFsc2UsXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIC8vIFx1NjI1M1x1NTMwNVx1OEY5M1x1NTFGQVx1NzY4NFx1OTE0RFx1N0Y2RVxyXG4gICAgICAgICAgbWFudWFsQ2h1bmtzOiBpZCA9PiB7XHJcbiAgICAgICAgICAgIC8vIFx1OEZEOVx1NEUyQUlEXHVGRjBDXHU1QzMxXHU2NjJGXHU2MjQwXHU2NzA5XHU2NTg3XHU0RUY2XHU3Njg0XHU3RUREXHU1QkY5XHU4REVGXHU1Rjg0XHJcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcclxuICAgICAgICAgICAgICAvLyBcdTU2RTBcdTRFM0Egbm9kZV9tb2R1bGVzIFx1NEUyRFx1NzY4NFx1NEY5RFx1OEQ1Nlx1OTAxQVx1NUUzOFx1NjYyRlx1NEUwRFx1NEYxQVx1NjUzOVx1NTNEOFx1NzY4NFxyXG4gICAgICAgICAgICAgIC8vIFx1NjI0MFx1NEVFNVx1NzZGNFx1NjNBNVx1NTM1NVx1NzJFQ1x1NjI1M1x1NTMwNVx1NTFGQVx1NTNCQlxyXG4gICAgICAgICAgICAgIC8vIFx1OEZEOVx1NEUyQXJldHVybiBcdTc2ODRcdTUwM0NcdTVDMzFcdTY2MkZcdTYyNTNcdTUzMDVcdTc2ODRcdTU0MERcdTc5RjBcclxuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgYWxpYXM6IHtcclxuICAgICAgICAvLyBcdThCQkVcdTdGNkVcdThERUZcdTVGODRcclxuICAgICAgICAnfic6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLycpLFxyXG4gICAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1NTIyQlx1NTQwRFxyXG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICAgIH0sXHJcbiAgICAgIGV4dGVuc2lvbnM6IFsnLm1qcycsICcuanMnLCAnLnRzJywgJy5qc3gnLCAnLnRzeCcsICcuanNvbicsICcudnVlJ10sXHJcbiAgICB9LFxyXG5cclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgdnVlKClcclxuICAgICAgLy8gZXNsaW50KCksXHJcbiAgICAgIC8vIFtcclxuICAgICAgLy8gICBlc2xpbnQoe1xyXG4gICAgICAvLyAgICAgZmFpbE9uV2FybmluZzogZmFsc2UsXHJcbiAgICAgIC8vICAgICBmYWlsT25FcnJvcjogZmFsc2UsXHJcbiAgICAgIC8vICAgfSksXHJcbiAgICAgXHJcbiAgICAgIC8vIF0sXHJcbiAgICAgIC8vIC4uLmNyZWF0ZVZpdGVQbHVnaW5zKCksXHJcbiAgICAgIC8vIG5ldyBVc2VsZXNzRmlsZSh7XHJcbiAgICAgIC8vICAgLy8gXHU2MDI3XHU4MEZEXHU0RjE4XHU1MzE2IFx1RkYxQVx1NTIyMFx1OTY2NFx1OTg3OVx1NzZFRVx1NEUyRFx1NkNBMVx1NjcwOVx1NUYxNVx1NzUyOFx1NTE3M1x1N0NGQlx1NzY4NFx1NjU4N1x1NEVGNlxyXG4gICAgICAvLyAgIHJvb3Q6ICcuL3NyYycsIC8vIFx1OTg3OVx1NzZFRVx1NzZFRVx1NUY1NVxyXG4gICAgICAvLyAgIG91dDogJy4vZmlsZUxpc3QuanNvbicsIC8vIFx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTIxN1x1ODg2OFxyXG4gICAgICAvLyAgIGNsZWFuOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1MjIwXHU5NjY0XHU2NTg3XHU0RUY2LFxyXG4gICAgICAvLyAgIGV4Y2x1ZGU6IC9ub2RlX21vZHVsZXMvLCAvLyBcdTYzOTJcdTk2NjRcdTY1ODdcdTRFRjZcdTUyMTdcdTg4NjhcclxuICAgICAgLy8gfSksXHJcbiAgICAgIC8vIG5ldyBDb21wcmVzc2lvblBsdWdpbih7XHJcbiAgICAgIC8vICAgdGVzdDogL1xcLihqc3xjc3N8aHRtbCkkLywgLy8gXHU1MzM5XHU5MTREXHU2NTg3XHU0RUY2XHU1NDBEXHJcbiAgICAgIC8vICAgdGhyZXNob2xkOiAxMDI0MCxcclxuICAgICAgLy8gfSksXHJcbiAgICBdLFxyXG4gICAgcGFnZXM6IHtcclxuICAgICAgaW5kZXg6IHtcclxuICAgICAgICBlbnRyeTogJ3NyYy9tYWluLmpzJyxcclxuICAgICAgICB0ZW1wbGF0ZTogJ3B1YmxpYy9pbmRleC5odG1sJyxcclxuICAgICAgICBmaWxlbmFtZTogJ2luZGV4Lmh0bWwnLFxyXG4gICAgICAgIC8vIGNodW5rczogWydjaHVuay12ZW5kb3JzJywgJ2NodW5rLWNvbW1vbicsICdpbmRleCddXHJcbiAgICAgIH0sXHJcbiAgICAgIHZpZXdQYW5lbDogJ3NyYy92aWV3UGFuZWwuanMnLFxyXG4gICAgICAvLyB2aWV3UGFuZWw6IHtcclxuICAgICAgLy8gICBlbnRyeTogJy4vc3JjL3ZpZXdQYW5lbC5qcycsXHJcbiAgICAgIC8vICAgdGVtcGxhdGU6ICdwdWJsaWMvdmlld1BhbmVsLmh0bWwnLFxyXG4gICAgICAvLyAgIGZpbGVuYW1lOiAndmlld1BhbmVsLmh0bWwnLFxyXG4gICAgICAvLyB9XHJcbiAgICB9LFxyXG4gICAgcnVudGltZUNvbXBpbGVyOiB0cnVlLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgcG9ydDogJzgwODcnLFxyXG4gICAgICBodHRwczogZmFsc2UsXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJ14vZHMvJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2RvcHVhdC5sb25nc3lzLmNvbScsIC8vICdcdTRFRTNcdTc0MDZcdTc2RUVcdTY4MDdcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODQnXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NjUyRlx1NjMwMVx1OERFOFx1NTdERlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ14vZGEvJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2RvcHVhdC5sb25nc3lzLmNvbScsIC8vICdcdTRFRTNcdTc0MDZcdTc2RUVcdTY4MDdcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODQnXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NjUyRlx1NjMwMVx1OERFOFx1NTdERlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ14vZGwvJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2RvcHVhdC5sb25nc3lzLmNvbScsIC8vICdcdTRFRTNcdTc0MDZcdTc2RUVcdTY4MDdcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODQnXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NjUyRlx1NjMwMVx1OERFOFx1NTdERlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ14vZGVhLyc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9kb3B1YXQubG9uZ3N5cy5jb20nLCAvLyAnXHU0RUUzXHU3NDA2XHU3NkVFXHU2ODA3XHU3Njg0XHU1N0ZBXHU3ODQwXHU4REVGXHU1Rjg0J1xyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLCAvLyBcdTY1MkZcdTYzMDFcdThERThcdTU3REZcclxuICAgICAgICB9LFxyXG4gICAgICAgICdeL2J1Yi8nOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vZG9wdWF0LmxvbmdzeXMuY29tJywgLy8gJ1x1NEVFM1x1NzQwNlx1NzZFRVx1NjgwN1x1NzY4NFx1NTdGQVx1Nzg0MFx1OERFRlx1NUY4NCdcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSwgLy8gXHU2NTJGXHU2MzAxXHU4REU4XHU1N0RGXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnXi9kcHIvJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2RvcHVhdC5sb25nc3lzLmNvbScsIC8vICdcdTRFRTNcdTc0MDZcdTc2RUVcdTY4MDdcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODQnXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NjUyRlx1NjMwMVx1OERFOFx1NTdERlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgJ14vZG9jci8nOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTAuMTEuMTIuMjM2OjgyODAnLCAvLyAnXHU0RUUzXHU3NDA2XHU3NkVFXHU2ODA3XHU3Njg0XHU1N0ZBXHU3ODQwXHU4REVGXHU1Rjg0J1xyXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovL2RvcHVhdC5sb25nc3lzLmNvbScsIC8vICdcdTRFRTNcdTc0MDZcdTc2RUVcdTY4MDdcdTc2ODRcdTU3RkFcdTc4NDBcdThERUZcdTVGODQnXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsIC8vIFx1NjUyRlx1NjMwMVx1OERFOFx1NTdERlxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG5cclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgbGVzczoge1xyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCIke3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwic3JjL2Fzc2V0cy92YXJpYWJsZS5sZXNzXCIpfVwiO2AsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBUUEsT0FBTyxZQUFZO0FBR25CLE9BQU8sU0FBUztBQUdoQixTQUFTLG9CQUFvQjtBQUU3QixPQUFPLFVBQVU7QUFoQmpCLElBQU0sbUNBQW1DO0FBVXpDO0FBRUE7QUFNQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLE1BQU0sUUFBUSxNQUFNO0FBQ2pELFNBQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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
