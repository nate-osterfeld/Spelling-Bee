const router = require('express').Router()
const pool = require('../db.js')

router.get('/', async (req, res) => {
    const { level } = req.query
    
    if (level !== 'all') {
        const query_getRandomWord = 'SELECT * FROM words WHERE level = $1 ORDER BY RANDOM() LIMIT 1'
        let { rows } = await pool.query(query_getRandomWord, [level])
        
        return res.status(200).json(rows[0])
    }

    const query_getRandomWord = 'SELECT * FROM words ORDER BY RANDOM() LIMIT 1'
    let { rows } = await pool.query(query_getRandomWord)
    
    res.status(200).json(rows[0])
})

module.exports = router
