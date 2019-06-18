if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const api = require('./api')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const express = require('express')
const history = require('connect-history-api-fallback')
const { resolve } = require('path')

const csrfProtection = csrf({ cookie: true })

module.exports = {
  api: app => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(csrfProtection)
    app.use((req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken())
      next()
    })
    app.use('/api', api)
  },
  errors: app => {
    require('./errors')(app)
  },
  security: app => {
    app.use(require('helmet')())
  },
  static: app => {
    const publicPath = resolve(__dirname, '../static')
    const staticConf = { maxAge: '1y', etag: false }
    app.use(express.static(publicPath, staticConf))
    app.use('/', history())
  },
}
