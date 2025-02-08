require('dotenv').config
const express = require('express')
const passport = require('passport')
require('./services/passport.js')
const q = require('./queries')

const app = express()

app.use(express.json())

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

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log('Express server listening on port: ', PORT)
})
