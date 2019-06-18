const { Router } = require('express')
const router = Router()
const transporter = require('./email')

router.get('/', (req, res) => {
  res.json({ message: 'test' })
})

router.post('/', (req, res, next) => {
  transporter.sendMail(
    {
      from: 'santa@simplesecretsanta.app',
      to: 'kasey.culmback@gmail.com',
      subject: 'Emails',
      text: 'hey there',
    },
    (err, info) => {
      if (err) {
        console.error(err)
        return next(err)
      }
      console.log(info)
      res.json({
        message: 'success',
      })
    }
  )
})

module.exports = router
