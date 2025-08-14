/*
 * @Description: 
 * @Date: 2025-07-21 14:21:50
 * @LastEditTime: 2025-07-21 14:22:28
 * @FilePath: \webpack-teste:\others\jsplumb-test\plugins\i18n.js
 */


export default {
  install: (app, options) => {
    app.config.globalProperties.$translate = (key) => {
      return key.split('.').reduce((s,i) => {
        if(s) return s[i]
      }, options)
    }
  }
}