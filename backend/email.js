const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')

const devTransport = {
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
  },
}

const mailgunTransport = mailgun({
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
})

const transporter = nodemailer.createTransport(
  // mailgunTransport
  process.env.NODE_ENV === 'production' ? mailgunTransport : devTransport
)

module.exports = transporter
