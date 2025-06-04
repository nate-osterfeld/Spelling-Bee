const router = require('express').Router()
const pool = require('../db.js')
const utils = require('../lib/utils.js')
const { queries } = require('../sql/index.js')

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
router.post('/save-to-history', utils.authMiddleware, async (req, res) => {
	const { isCorrect, word } = req.body

	if (req.user) {
		// Update word's global correctness rating
		if (isCorrect) {
			const query_updateWordSuccessRate =
				'UPDATE words SET correct = correct + 1 WHERE word = $1'
			await pool.query(query_updateWordSuccessRate, [word])
		} else {
			const query_updateWordSuccessRate =
				'UPDATE words SET incorrect = incorrect + 1 WHERE word = $1'
			await pool.query(query_updateWordSuccessRate, [word])
		}

		// Save word to user history
		const query_saveToHistory =
			'INSERT INTO wordshistory (created_at, is_correct, user_id, word_id) VALUES(' +
			'NOW(), $1, $2, (SELECT id FROM words WHERE word = $3))'
		let { rowCount } = await pool.query(query_saveToHistory, [isCorrect, req.user.id, word])

		if (rowCount) {
			return res
				.status(200)
				.json({ success: true, message: 'Successfully saved word to user history' })
		}

		return res.json({ success: false, message: 'Unable to save word to user history' })
	}

	return res.json({ message: 'Please sign in to save words to your history' })
})

router.post('/save-to-favorites', utils.authMiddleware, async (req, res) => {
	if (!req.user) {
		return res.status(400).json({ success: false, message: 'Please sign in to save words to your account' })
	}

	const { word_id } = req.body

	const query_SaveWord = 'INSERT INTO wordssaved (user_id, word_id) VALUES ($1, $2)'
	try {
		await pool.query(query_SaveWord, [req.user.id, word_id])
		return res.status(200).json({ success: true, message: 'Word saved to favorites' })
	} catch (e) {
		return res.status(500).json({ success: false, message: 'Unable to save word' })
	}
})

router.post('/unsave-from-favorites', utils.authMiddleware, async (req, res) => {
	if (!req.user) {
		return res.status(400).json({ success: false, message: 'Please sign in to save words to your account' })
	}

	const { word_id } = req.body
	const query_UnsaveWord = 'DELETE FROM wordssaved WHERE user_id = $1 AND word_id = $2'
	try {
		await pool.query(query_UnsaveWord, [req.user.id, word_id])
		return res.status(200).json({ success: true, message: 'Word unsaved from favorites' })
	} catch (e) {
		return res.status(500).json({ success: false, message: 'Unable to unsave word' })
	}
})

module.exports = router
