const router = require('express').Router()

router.use('/words', require('./words.js'))
router.use('/stats', require('./stats.js'))

module.exports = router
