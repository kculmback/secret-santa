const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'test' })
})

router.post('/', (req, res) => {
  console.log(req.body._csrf)
  console.log(req.query._csrf)
  console.log(req.headers['csrf-token'])
  res.json({ message: 'success' })
})

module.exports = router
