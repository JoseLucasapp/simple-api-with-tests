const express = require('express')
const database = require('./data')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.status(200).json({ database, length: database.length })
})

app.get('/:id', (req, res) => {
    if (database[parseInt(req.params.id)]) {
        return res.status(200).json({ data: database[parseInt(req.params.id)] })
    }
    res.status(404).json({ msg: 'Not found.' })
})

app.post('/', (req, res) => {
    const { name, age, country } = req.body
    if (!name || !age || !country) {
        res.status(400).json({ msg: 'You must send all fields.' })
        return
    }
    database.push({ name, age, country })
    res.status(200).json({ msg: 'New user created.' })
})

module.exports = app