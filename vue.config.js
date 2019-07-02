const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  outputDir: 'static',
  configureWebpack: {
    resolve: {
      alias: {
        '%': resolve('public'),
        '@': resolve('frontend'),
      },
    },
  },
  devServer: {
    before: app => {
      const { api, errors } = require('./backend/configure')
      // logging(app)
      api(app)
      errors(app)
    },
    port: 5000,
    // public: 'secret-santa.kaseydev.14four.com',
    disableHostCheck: true,
    // allowedHosts: ['.14four.com', 'localhost'],
  },
}
