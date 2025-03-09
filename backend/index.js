require('dotenv').config
const express = require('express')
const session = require('cookie-session')
const passport = require('passport')
require('./services/passport.js')
const q = require('./queries')
const keys = require('./config/keys.js')
const pool = require('./db.js')
const utils = require('./lib/utils.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	session({
		name: 'session',
		maxAge: 60 * 24 * 60 * 60 * 1000, // 60 days
		keys: [keys.cookie_key], // Encrypt session data
	})
)

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
	console.log('GET /')
	return res.json('This route works')
})

app.get('/users', q.getUsers)

app.get(
	'/auth/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	}),
)

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
	const { token, expiresIn } = utils.issueJWT(req.user.id)

	res.status(200).json({
		success: true,
		token,
		expiresIn,
	})
})

// app.get('/test_cookie', (req, res) => {
// 	res.send(req.user)
// })

app.get('/api/test-jwt', utils.authMiddleware, (req, res) => {
	res.status(200).json({ success: true, message: 'You are successfully authenticated to visit this route' })
})

app.get('/api/logout', (req, res) => {
	req.logout()
	res.send(req.user)
})

app.post('/api/register', async (req, res) => {
	const query_selectUserByEmail = 'SELECT * FROM users WHERE email = $1'
	let { rows } = await pool.query(query_selectUserByEmail, [req.body.email])

	if (rows.length === 0) {
		const { salt, hash } = utils.genPassword(req.body.password)

		const query_saveUser = 'INSERT INTO users (email, password, salt, acc_type) VALUES ($1, $2, $3, $4)'
		const { rowCount } = await pool.query(query_saveUser, [req.body.email, hash, salt, 'email'])

		if (rowCount === 1) {
			// const query_selectUser = 'SELECT * FROM users WHERE email = $1'
			// const user = await pool.query(query_selectUser, [req.body.email])

			res.redirect('http://localhost:5173?registration=successful')
		} else {
			res.json({ success: false, message: 'Unable to save user' })
		}
	} else {
		res.json({ success: false, message: 'User with email already exists' })
	}
})

app.post('/api/login', async (req, res) => {
	const query_selectUserByEmail = 'SELECT * FROM users WHERE email = $1'
	const user = await pool.query(query_selectUserByEmail, [req.body.email])
	
	if (user.rowCount === 1) {
		const { id, password, salt } = user.rows[0]
		const isValid = utils.verifyPassword(req.body.password, password, salt)

		if (isValid) {
			const { token, expiresIn } = utils.issueJWT(id)

			res.cookie("jwt", token, {
				httpOnly: true,
				// secure: true,
				sameSite: 'Lax',
				expires: expiresIn * 1000
			})

			res.redirect('http://localhost:5173/?sign-in-successful')
		} else {
			res.redirect('http://localhost:5173/?failed-login') // invalid password
		}
	} else {
		res.redirect('http://localhost:5173/?failed-login') // unknown email
	}
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Express server listening on port: ', PORT)
})
