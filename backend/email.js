const nodemailer = require('nodemailer')

let transport

if (process.env.NODE_ENV === 'production') {
  const mailgun = require('nodemailer-mailgun-transport')
  transport = mailgun({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  })
} else {
  transport = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  }
}

const transporter = nodemailer.createTransport(transport)

module.exports = transporter
