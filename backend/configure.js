if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const api = require('./api')

const csrfProtection = csrf({ cookie: true })

module.exports = {
  csrfProtection,
  app: app => {
    app.use(helmet())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(csrfProtection)
    app.use((req, res, next) => {
      res.cookie('XSRF-TOKEN', req.csrfToken())
      next()
    })
    app.use('/api', api)
    require('./errors')(app)
  },
}
