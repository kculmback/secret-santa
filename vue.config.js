const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '%': resolve('public'),
        '@': resolve('frontend'),
      },
    },
  },
  devServer: {
    before: require('./backend/configure').app,
  },
}
