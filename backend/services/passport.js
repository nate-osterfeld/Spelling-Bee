const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys.js')
const pool = require('../db.js')

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.GOOGLE_CLIENT_ID,
			clientSecret: keys.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/callback',
		},
        async (accessToken, refreshToken, profile, done) => {
            // google info
            const values = [profile.id, profile.displayName, profile.emails[0].value]

            // select/insert queries
            const query_selectUser = 'SELECT * FROM users WHERE google_id = $1'
            const query_insertUser = 'INSERT INTO users (google_id, name, email) VALUES ($1, $2, $3)'

            // select user
            let userResults = await pool.query(query_selectUser, [profile.id])
            
            // if user exists -> done(user)
            if (userResults.rows.length) {
                const user = userResults.rows[0]
                done(null, user)
            // else insert user -> select user -> done(user)
            } else {
                await pool.query(query_insertUser, values)
                userResults = await pool.query(query_selectUser, [profile.id])
                const user = userResults.rows[0]
                done(null, user)
            }
        }
	)
)
