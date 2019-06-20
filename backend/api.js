const { Router } = require('express')
const router = Router()
const { body, validationResult } = require('express-validator/check')
const transporter = require('./email')
// const { logger } = require('./logging')

router.post(
  '/submit',
  [
    body('participants').isArray(),
    body('participants.*.email')
      .isEmail()
      .normalizeEmail(),
    body('participants.*.name')
      .not()
      .isEmpty()
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const participants = req.body.participants
    const sendMail = participants.map((participant, index, array) => {
      return transporter.sendMail({
        from: 'santa@simplesecretsanta.app',
        to: participant.email,
        subject: 'Your Secret Santa Pairing!',
        text: `Hi ${participant.name}! You need to get a gift for: ${
          (array[index + 1] || array[0]).name
        }`,
      })
    })

    const results = await Promise.all(sendMail.map(p => p.catch(e => e)))
    console.log('Email Results', results)

    const errorResults = results.filter(result => result instanceof Error)

    if (errorResults.length) {
      console.error('Failed email', errorResults)
      return res.status(422).json({
        message: 'Could not submit 1 or more emails',
      })
    }

    return res.json({ message: 'success' })
  }
)

module.exports = router
