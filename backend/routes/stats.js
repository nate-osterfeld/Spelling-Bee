const router = require('express').Router()
const pool = require('../db.js')
const utils = require('../lib/utils.js')
const { queries } = require('../sql/index.js')

router.get('/leaderboard/:page', utils.authMiddleware, async (req, res) => {
    const page = parseInt(req.params.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;
	const query_UserCount = 
		'SELECT COUNT(DISTINCT users.id) ' +
		'FROM users ' +
		'JOIN wordshistory ON wordshistory.user_id = users.id'

    try {
        const { rows: ranks } = await pool.query(queries['analytics/get_leaderboard_ranks'], [pageSize, offset]);
		const { rows: userCount } = await pool.query(query_UserCount)
		numOfPages = Math.ceil(userCount[0].count / pageSize)
        res.json({ numOfPages, ranks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
})

router.get('/progress', utils.authMiddleware, async (req, res) => {
	if (req.user) {
		let { rows: history } = await pool.query(queries['analytics/get_progress'], [req.user.id])
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
			username: req.user.name,
			percentile: percentile
		})
	}

	return res.json({ success: false, message: 'User not logged in' })
})

router.get('/u/:userId', async (req, res) => {
	const query_SelectProgress =
		'SELECT word, level, is_correct, correct, incorrect, created_at ' +
		'FROM wordshistory ' +
		'JOIN words ON wordshistory.word_id = words.id ' +
		'WHERE user_id = $1'

	const query_SelectUsername =
		'SELECT name ' +
		'FROM users ' +
		'WHERE id = $1'
		
	let { rows: username } = await pool.query(query_SelectUsername, [req.params.userId])
	let { rows: history } = await pool.query(query_SelectProgress, [req.params.userId])
	let { rows: accuracy } = await pool.query(queries['analytics/get_weighted_accuracy'])

	const userScore = accuracy.find((score) => score.user_id === parseInt(req.params.userId)) // Find weighted accuracy for user

	let percentile = null
	if (userScore) {
		const userBeats = accuracy.filter(
			(score) => userScore.weighted_accuracy > score.weighted_accuracy,
		).length // Count how many user is ahead of

		percentile = ((userBeats + 1) / accuracy.length) * 100
	}

	return res.status(200).json({
		success: true,
		data: history,
		username: username[0].name,
		percentile: percentile
	})
})

module.exports = router
