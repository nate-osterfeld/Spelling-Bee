const router = require('express').Router()
const pool = require('../db.js')
const utils = require('../lib/utils.js')

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

// Save word to user's history
router.post('/save', utils.authMiddleware, async (req, res) => {
    const { isCorrect, word } = req.body
    
    if (req.user) {
        // Update word's global correctness rating
        if (isCorrect) {
            const query_updateWordSuccessRate = 'UPDATE words SET correct = correct + 1 WHERE word = $1'
            await pool.query(query_updateWordSuccessRate, [word])
        } else {
            const query_updateWordSuccessRate = 'UPDATE words SET incorrect = incorrect + 1 WHERE word = $1'
			await pool.query(query_updateWordSuccessRate, [word])
        }

        // Save word to user history
        const query_saveToHistory =
            'INSERT INTO wordshistory (created_at, is_correct, user_id, word_id) VALUES(' +
            'NOW(), $1, $2, (SELECT id FROM words WHERE word = $3))'
        let { rowCount } = await pool.query(query_saveToHistory, [isCorrect, req.user.id, word])
    
        if (rowCount) {
            return res.status(200).json({ success: true, message: 'Successfully saved word to user history' })
        }
    
        return res.json({ success: false, message: 'Unable to save word to user history' })
    }

    return res.json({ message: 'Please sign in to save words to your history' })
})

router.get('/progress', utils.authMiddleware, async (req, res) => {
    if (req.user) {
        const query_SelectProgress =
            "SELECT word, level, is_correct, correct, incorrect, created_at " +
            "FROM wordshistory " +
            "JOIN words ON wordshistory.word_id = words.id " +
            "WHERE user_id = $1"
        let { rows } = await pool.query(query_SelectProgress, [req.user.id])

        return res.status(200).json({ success: true, data: rows })
    }

    return res.json({ success: false, message: 'User not logged in' })
})

module.exports = router
