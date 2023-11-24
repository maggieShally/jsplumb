/*
 * @Description:
 * @Date: 2021-07-21 11:18:51
 * @LastEditTime: 2023-10-30 15:56:11
 * @FilePath: \webpack-teste:\others\jsplumb-test\vue.config.js
 */
const path = require('path')
const UselessFile = require('useless-files-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    viewPanel: 'src/viewPanel.js'
    // viewPanel: {
    //   entry: './src/viewPanel.js',
    //   template: 'public/viewPanel.html',
    //   filename: 'viewPanel.html',
    // }
  },
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: '8087',
    https: false,
    open: true,
    proxy: {
      '^/ds/': {
        target: 'http://dopdev.longsys.com', // '代理目标的基础路径'
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径: 去掉路径中开头的''
          '^/ds/': '/ds/'
        }
      },
      '^/da/': {
        target: 'http://dopdev.longsys.com', // '代理目标的基础路径'
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径: 去掉路径中开头的''
          '^/da/': '/da/'
        }
      },
    }
  },
  configureWebpack: config => {
    // 添加如下代码
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    const resolve = {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js'
      }
    }
    return {
      resolve,
      // externals: {
      //   vue: 'Vue'
      // },
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/
          }
        ]
      },
      plugins: [
        new UselessFile({
          // 性能优化 ：删除项目中没有引用关系的文件
          root: './src', // 项目目录
          out: './fileList.json', // 输出文件列表
          clean: false, // 是否删除文件,
          exclude: /node_modules/ // 排除文件列表
        }),
        new CompressionPlugin({
          test: /\.(js|css|html)$/, // 匹配文件名
          threshold: 10240
        })
      ]
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/main.less')] // 引入全局样式变量
    }
  }
}
