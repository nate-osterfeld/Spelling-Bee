require('dotenv').config
const express = require('express')
const session = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('./services/passport.js')
const keys = require('./config/keys.js')
const pool = require('./db.js')
const utils = require('./lib/utils.js')
require('./sql/index.js')

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
	return res.json('This route works')
})

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
		sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
		expires: expiresIn * 1000,
	})

	res.redirect(`${process.env.FRONTEND_URL}/?sign-in-successful`)
})

app.use('/api', require('./routes/index.js'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Express server listening on port: ', PORT)
})
