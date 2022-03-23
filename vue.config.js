/*
 * @Description: 
 * @Date: 2021-07-21 11:18:51
 * @LastEditTime: 2022-01-11 17:11:05
 * @FilePath: \webpack-teste:\others\jsplumb-test\vue.config.js
 */
const path = require("path");

module.exports = { 
  runtimeCompiler: true,
  devServer: {
    host: "0.0.0.0",
    port: "8088",
    https: false,
    open: true,
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/assets/main.less")], // 引入全局样式变量
    },
  },
}