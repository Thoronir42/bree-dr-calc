const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')


module.exports = {
  css: {
    sourceMap: true
  },
  configureWebpack: (config) => {
    config.resolve.plugins.push(new TsconfigPathsPlugin())
    // console.log(config)

  },
}
