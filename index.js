const express = require('express')
const init = require('./db')
require('dotenv').config()

const PORT = 4040
const server = express()

const authorsRoutes = require('./routes/authors')
server.use(express.json())
server.use('/', authorsRoutes)

init()

server.listen(PORT, () => console.log('Server up and running.', PORT))