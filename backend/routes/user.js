const router = require('express').Router()
const pool = require('../db.js')
const utils = require('../lib/utils.js')

router.get('/current-user', utils.authMiddleware, (req, res) => {
	if (req.user) {
		res.status(200).json({ signedIn: true, ...req.user })
	} else {
		res.status(200).json({ signedIn: false })
	}
})

router.patch('/username', utils.authMiddleware, async (req, res) => {
	if (!req.user) {
    	return res.status(401).json({ success: false, message: "Unauthorized" })
  	}
	
	try {
		const query_SelectUsername = 
		'SELECT name FROM users WHERE name = $1'
		
		const { rows } = await pool.query(query_SelectUsername, [req.body.username])
		
		if (rows.length) {
			return res.status(409).json({ success: false, message: `Username already exists`})
		}
		
		const query_UpdateUsername = 'UPDATE users SET name = $1 WHERE id = $2'
		await pool.query(query_UpdateUsername, [req.body.username, req.user.id])
		
		res.status(200).json({ success: true, message: "Username update successful" })
	} catch (e) {
		return res.status(500).json({ success: false, message: "Unable to update username" })
	}
})

router.post('/logout', utils.authMiddleware, (req, res) => {
	res.clearCookie('jwt', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
	})
	res.status(200).json({ success: true, message: 'Logged out' })
})

router.post('/register', async (req, res) => {
    const query_selectUserByEmail = 'SELECT * FROM users WHERE email = $1'
    let { rows } = await pool.query(query_selectUserByEmail, [req.body.email])

    if (rows.length === 0) {
        const { salt, hash } = utils.genPassword(req.body.password)

        const query_saveUser = 'INSERT INTO users (email, password, salt, acc_type) VALUES ($1, $2, $3, $4)'
        const { rowCount } = await pool.query(query_saveUser, [req.body.email, hash, salt, 'email'])
        if (rowCount === 1) {
            res.redirect(`${process.env.FRONTEND_URL}?registration=successful`)
        } else {
            res.json({ success: false, message: 'Unable to save user' })
        }
    } else {
        res.json({ success: false, message: 'User with email already exists' })
    }
})

router.post('/login', async (req, res) => {
	const query_selectUserByEmail = 'SELECT * FROM users WHERE email = $1'
	const user = await pool.query(query_selectUserByEmail, [req.body.email])
	
	if (user.rowCount === 1) {
		const { id, password, salt } = user.rows[0]
		const isValid = utils.verifyPassword(req.body.password, password, salt)

		if (isValid) {
			const { token, expiresIn } = utils.issueJWT(id) // serialize user with id

			res.cookie("jwt", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
				expires: expiresIn * 1000
			})

			res.redirect(`${process.env.FRONTEND_URL}/?sign-in-successful`)
		} else {
			res.redirect(`${process.env.FRONTEND_URL}/?failed-login`) // invalid password
		}
	} else {
		res.redirect(`${process.env.FRONTEND_URL}/?failed-login`) // unknown email
	}
})

router.get('/saved-words', utils.authMiddleware, async (req, res) => {
	if (!req.user) {
		return res.json({ success: false, message: 'Please sign in to access saved words' })
	}

	try {
		const query_getFavoriteWords = 
			"SELECT * FROM wordssaved " +
			"JOIN words ON words.id = wordssaved.word_id " +
			"WHERE user_id = $1"
		const { rows } = await pool.query(query_getFavoriteWords, [req.user.id])
		return res.status(200).json({ success: true, words: rows })
	} catch (e) {
		return res.status(500).json({ success: false, message: 'Unable to retrieve words' })
	}
})

module.exports = router