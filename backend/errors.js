const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)

  res.status(403).json(err)
}

const defaultErrorHandler = (err, req, res, next) => {
  res.status(500).json(err)
}

module.exports = app => {
  app.use(csrfErrorHandler)
  app.use(defaultErrorHandler)
}
