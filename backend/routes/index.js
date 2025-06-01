const router = require('express').Router()

router.use('/words', require('./words.js'))
router.use('/stats', require('./stats.js'))
router.use('/user', require('./user.js'))

module.exports = router
