require('dotenv').config
const express = require('express')
const q = require('./queries')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    console.log('GET /')
    return res.json('This route works')
})

app.get('/users', q.getUsers)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Express server listening on port: ', PORT)
})
