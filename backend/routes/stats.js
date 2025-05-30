const router = require('express').Router()
const pool = require('../db.js')
const utils = require('../lib/utils.js')
const { queries } = require('../sql/index.js')

router.get('/leaderboard', utils.authMiddleware, async (req, res) => {
	const page = parseInt(req.query.page) || 1
    const pageSize = parseInt(req.query.pageSize) || 5
    const offset = (page - 1) * pageSize

	try {
        const result = await pool.query(queries['analytics/get_leaderboard_ranks'], [pageSize, offset])
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
})

router.get('/progress', utils.authMiddleware, async (req, res) => {
	if (req.user) {
		const query_SelectProgress =
			'SELECT word, level, is_correct, correct, incorrect, created_at ' +
			'FROM wordshistory ' +
			'JOIN words ON wordshistory.word_id = words.id ' +
			'WHERE user_id = $1'
			
		let { rows: history } = await pool.query(query_SelectProgress, [req.user.id])
		let { rows: accuracy } = await pool.query(queries['analytics/get_weighted_accuracy'])

		const userScore = accuracy.find((score) => score.user_id === req.user.id) // Find weighted accuracy for user

		let percentile = null
		if (userScore) {
			const userBeats = accuracy.filter(
				(score) => userScore.weighted_accuracy > score.weighted_accuracy,
			).length

			percentile = ((userBeats + 1) / accuracy.length) * 100
		}

		return res.status(200).json({
			success: true,
			data: history,
			percentile: percentile
		})
	}

	return res.json({ success: false, message: 'User not logged in' })
})

module.exports = router