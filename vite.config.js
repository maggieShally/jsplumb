/*
 * @Description:
 * @Date: 2021-07-21 11:18:51
 * @LastEditTime: 2024-11-08 10:14:25
 * @FilePath: \webpack-teste:\others\jsplumb-test\vite.config.js
 */
// const CompressionPlugin = require('compression-webpack-plugin')

import eslint from 'vite-plugin-eslint'  

debugger
import vue from "@vitejs/plugin-vue"
debugger

import { defineConfig } from 'vite'
// import createVitePlugins from './plugins'
import path from 'path'

export default defineConfig(({ mode, command }) => {
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
          manualChunks: id => {
            // 这个ID，就是所有文件的绝对路径
            if (id.includes('node_modules')) {
              // 因为 node_modules 中的依赖通常是不会改变的
              // 所以直接单独打包出去
              // 这个return 的值就是打包的名称
              return 'vendor'
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
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
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index.html',
        // chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      viewPanel: 'src/viewPanel.js',
      // viewPanel: {
      //   entry: './src/viewPanel.js',
      //   template: 'public/viewPanel.html',
      //   filename: 'viewPanel.html',
      // }
    },
    runtimeCompiler: true,
    server: {
      host: '0.0.0.0',
      port: '8087',
      https: false,
      open: true,
      proxy: {
        '^/ds/': {
          target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
        '^/da/': {
          target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
        '^/dl/': {
          target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
        '^/dea/': {
          target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
        '^/bub/': {
          target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
        '^/dpr/': {
          target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
        '^/docr/': {
          target: 'http://10.11.12.236:8280', // '代理目标的基础路径'
          // target: 'http://dopuat.longsys.com', // '代理目标的基础路径'
          changeOrigin: true, // 支持跨域
        },
      },
    },

    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${path.resolve(__dirname, "src/assets/variable.less")}";`,
        },
      },
    }

  }
})
