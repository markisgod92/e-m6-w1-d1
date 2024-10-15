const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = 4040
const server = express()

const authorsRoutes = require('./routes/authors')
server.use(express.json())
server.use('/', authorsRoutes)


mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'DB connection error'))
db.once('open', () => console.log('DB connected'))


server.listen(PORT, () => console.log('Server up and running.', PORT))