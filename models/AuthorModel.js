const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    nome: {
        type: String, 
        required: true
    },
    cognome: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: false,
        default: 'email@email.com'
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