const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys.js')
const pool = require('../db.js')

// Configure Passport to use Google OAuth strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GOOGLE_CLIENT_ID, // Google OAuth client ID
			clientSecret: keys.GOOGLE_CLIENT_SECRET, // Google OAuth client secret
			callbackURL: keys.GOOGLE_CALLBACK_URL, // Callback route after authentication (prod || dev)
			scope: ['profile', 'email']
		},
		// On initial login
		async (accessToken, refreshToken, profile, done) => {
			// SQL queries to check if user exists and insert if new
			const query_selectUser = 'SELECT * FROM users WHERE google_id = $1'
			const query_insertUser =
			'INSERT INTO users (google_id, email, acc_type) VALUES ($1, $2, $3)'
			
			// Check if user already exists in the database
			let userResults = await pool.query(query_selectUser, [profile.id])
			
			let user;
			if (userResults.rows.length) {
				// If user exists, retrieve user and complete authentication
				user = userResults.rows[0]
			} else {
				// If user does not exist, insert them into database
				const values = [profile.id, profile.emails[0].value, 'auth']
				await pool.query(query_insertUser, values)
				userResults = await pool.query(query_selectUser, [profile.id])
				user = userResults.rows[0]
			}

			done(null, user)
		},
	),
)

// Set-cookie as user.id in response header (user taken from oauth callback)
// passport.serializeUser((user, done) => {
// 	done(null, user.id) // set user.id as cookie in response
// })

// // Deserialize user by retrieving them from database with id found in cookie (attach to req object)
// passport.deserializeUser(async (id, done) => {
// 	const query_selectUser = 'SELECT * FROM users WHERE id = $1'
// 	const results = await pool.query(query_selectUser, [id])

// 	const user = results.rows[0]
// 	done(null, user) // Pass user object to request
// })
