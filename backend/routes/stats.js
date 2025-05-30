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

module.exports = router