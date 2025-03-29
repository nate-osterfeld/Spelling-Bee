const router = require('express').Router()

router.use('/words', require('./words.js'))

module.exports = router
