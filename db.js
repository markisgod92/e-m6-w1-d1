const mongoose = require('mongoose')
require('dotenv').config()

const init = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database connected')
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

module.exports = init