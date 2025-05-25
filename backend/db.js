require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false, // Required for Supabase & Render
	},
})

pool.connect()
	.then(() => console.log('Connected to Postgres database'))
	.catch((err) => console.log('Error connecting to Postgres database', err))

// Test query
pool.query('SELECT NOW()', (err, res) => {
	if (err) {
		console.log('Environment: ', process.env.NODE_ENV || 'development')
		console.log('Error running test query:', err)
	} else {
		console.log('Environment: ', process.env.NODE_ENV || 'development')
		console.log('Test query result:', res.rows)
	}
})

module.exports = pool
