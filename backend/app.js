require('dotenv').config
const express = require('express')
const session = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./services/passport.js')
const q = require('./queries.js')
const keys = require('./config/keys.js')
const pool = require('./db.js')
const utils = require('./lib/utils.js')

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

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
		session: false
	}),
)

app.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
	const { token, expiresIn } = utils.issueJWT(req.user.id)

	res.cookie('jwt', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'Lax',
		expires: expiresIn * 1000,
	})

	res.redirect(`${process.env.FRONTEND_URL}/?sign-in-successful`)
})

// app.get('/test_cookie', (req, res) => {
// 	res.send(req.user)
// })

app.get('/api/current-user', utils.authMiddleware, (req, res) => {
	if (req.user) {
		res.status(200).json({ signedIn: true, ...req.user })
	} else {
		res.status(200).json({ signedIn: false })
	}
})

app.post('/api/logout', utils.authMiddleware, (req, res) => {
	res.clearCookie('jwt', { httpOnly: true, sameSite: 'lax' })
	res.status(200).json({ success: true, message: 'Logged out' })
})

app.post('/api/register', async (req, res) => {
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

app.post('/api/login', async (req, res) => {
	const query_selectUserByEmail = 'SELECT * FROM users WHERE email = $1'
	const user = await pool.query(query_selectUserByEmail, [req.body.email])
	
	if (user.rowCount === 1) {
		const { id, password, salt } = user.rows[0]
		const isValid = utils.verifyPassword(req.body.password, password, salt)

		if (isValid) {
			const { token, expiresIn } = utils.issueJWT(id) // serialize user with id

			res.cookie("jwt", token, {
				httpOnly: true,
				// secure: true,
				sameSite: 'Lax',
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

app.use('/api', require('./routes/index.js'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Express server listening on port: ', PORT)
})
