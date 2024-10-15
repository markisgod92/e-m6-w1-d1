const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    surname: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    birthdate: {
        type: String, 
        required: false,
        default: '30/02/1865'
    },
    avatar: {
        type: String, 
        required: false,
        default: 'https://picsum.photos/200/300'
    }
}, {
    strict: true 
})

module.exports = mongoose.model('authorModel', AuthorSchema, 'blog-authors')