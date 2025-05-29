require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false, // Required for Supabase & Render
	},
})

pool.on('error', (err, client) => {
	console.error('Unexpected error on idle Postgres client', err);
	// maybe log to a service or alert here
});

// Test query
pool.query('SELECT NOW()')
	.then(res => console.log('Connected to Postgres at', res.rows[0].now))
	.catch(err => console.error('Error connecting to Postgres database', err));

module.exports = pool
