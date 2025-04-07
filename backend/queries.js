const pool = require('./db')

const getUsers = async (req, res) => {
    const q = 'SELECT * FROM users'

    try {
        const result = await pool.query(q)
        res.json(result.rows)
    } catch (err) {
        console.error('Error fetching users', err)
        res.status(500).send('Error fetching users')
    }
}

module.exports = {
    getUsers
}
