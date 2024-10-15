const express = require('express')
const authorModel = require('../models/AuthorModel')
const authors = express.Router()


authors.get('/authors', async (req, res) => {
    try {
        const authors = await authorModel.find()

        if(authors.length === 0) {
            return res
                .status(404)
                .send({
                    message: "No authors found"
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                authors
            })

    } catch (e) {
        res
            .status(500)
            .send({
                message: e.message
            })
    }
})

authors.get('/authors/:authorId', async (req, res) => {
    const {authorId} = req.params

    try {
        const author = await authorModel.findById(authorId)

        if (!author) {
            return res
                .status(404)
                .send({
                    message: 'Author at ID not found'
                })
        }

        res
            .status(200)
            .send({
                statusCode: 200,
                author
            })
    } catch (e) {
        res
            .status(500)
            .send({
                message: e.message
            })
    }
})

authors.post('/authors', async (req, res) => {
    const {nome, cognome, email, birthdate, avatar} = req.body

    const newAuthor = new authorModel({
        nome: nome,
        cognome: cognome,
        email: email,
        birthdate: birthdate,
        avatar: avatar
    })

    try {
        const savedAuthor = await newAuthor.save()

        res.status(201)
            .send({
                statusCode: 201,
                message: 'Author added successfully',
                savedAuthor
            })
    } catch (e) {
        res
            .status(500)
            .send({
                message: e.message
            })
    }
})




module.exports = authors