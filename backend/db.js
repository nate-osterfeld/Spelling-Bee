require('dotenv').config()
const { Pool } = require('pg')

const pool =
	process.env.NODE_ENV === 'production'
		? new Pool({
				connectionString: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false, // Render requires SSL
				},
		  })
		: new Pool({
				user: process.env.DB_USER,
				host: process.env.DB_HOST,
				database: process.env.DB_NAME,
				password: process.env.DB_PASSWORD,
				port: process.env.DB_PORT,
		  })

pool.connect()
	.then(() => console.log(`Connected to Postgres database: ${process.env.NODE_ENV}`))
	.catch((err) => console.log('Error connecting to Postgres database', err))

module.exports = pool
