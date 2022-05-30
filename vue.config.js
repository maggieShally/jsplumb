/*
 * @Description:
 * @Date: 2021-07-21 11:18:51
 * @LastEditTime: 2022-04-28 09:29:24
 * @FilePath: \webpack-teste:\others\jsplumb-test\vue.config.js
 */
const path = require('path')

module.exports = {
  
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    viewPanel: 'src/viewPanel.js',
    // viewPanel: {
    //   entry: './src/viewPanel.js',
    //   template: 'public/viewPanel.html',
    //   filename: 'viewPanel.html',
    // }
  },
  runtimeCompiler: true,
  devServer: {
    host: '0.0.0.0',
    port: '8088',
    https: false,
    open: true,
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
      module: {
        rules: [
          {
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          }
        ]
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/main.less')] // 引入全局样式变量
    }
  }
}
