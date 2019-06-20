if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const express = require('express')
const history = require('connect-history-api-fallback')
const { resolve } = require('path')
const api = require('./api')
// const { expressLogger } = require('./logging')

const csrfProtection = csrf({ cookie: true })

module.exports = {
  // logging: app => {
  //   app.use(expressLogger)
  // },
  api: app => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    if (process.env.NODE_ENV === 'production') {
      app.use(cookieParser())
      app.use(csrfProtection)
      app.use((req, res, next) => {
        res.cookie('XSRF-TOKEN', req.csrfToken())
        next()
      })
    }
    app.use('/api', api)
  },
  errors: app => {
    require('./errors')(app)
  },
  security: app => {
    app.use(require('helmet')())
  },
  staticFiles: app => {
    const publicPath = resolve(__dirname, '../static')
    const staticConf = { maxAge: '1y', etag: false }
    app.use(express.static(publicPath, staticConf))
    app.use('/', history())
  },
}
