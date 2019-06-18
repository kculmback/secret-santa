const express = require('express')
const { api, errors, security, static } = require('./configure')

const app = express()

const { PORT = 5000 } = process.env

security(app)
static(app)
api(app)
errors(app)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`)
})
