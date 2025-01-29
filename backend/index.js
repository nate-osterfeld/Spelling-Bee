const express = require('express')

const port = 8800
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    console.log('GET /')
    return res.json('This route works')
})

app.listen(port, () => {
    console.log('Express server listening on port: ', port)
})
