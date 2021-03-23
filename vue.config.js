const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "../app.yoomzy.com/public_python/frontend/templates"),
  assetsDir: "./",
  publicPath: process.env.VUE_APP_PUBPLIC_PATH,
  lintOnSave: false,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: {
       symlinks: false,
       alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  },
  transpileDependencies: [
    '@coreui/utils'
  ]
}
