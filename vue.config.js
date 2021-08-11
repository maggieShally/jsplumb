/*
 * @Description: 
 * @Date: 2021-07-21 11:18:51
 * @LastEditTime: 2021-08-06 17:50:35
 * @FilePath: \jsplumb-test\vue.config.js
 */
const path = require("path");

module.exports = { 
  devServer: {
    host: "0.0.0.0",
    port: "8081",
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