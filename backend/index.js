require('dotenv').config
const express = require('express')
const session = require('cookie-session')
const passport = require('passport')
require('./services/passport.js')
const q = require('./queries')
const keys = require('./config/keys.js')

const app = express()

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

app.get('/auth/google/callback', passport.authenticate('google'))

app.get('/test_cookie', (req, res) => {
	console.log('test', req.user)
	res.send(req.user)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Express server listening on port: ', PORT)
})
