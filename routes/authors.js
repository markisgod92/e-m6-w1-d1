const express = require('express')
const authorModel = require('../models/AuthorModel')
const AuthorModel = require('../models/AuthorModel')
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

authors.put('/authors/:authorId', async (req, res) => {
    const {authorId} = req.params
    const authorExists = await AuthorModel.findById(authorId)

    if (!authorExists) {
        return res.status(400)
            .send({
                statusCode: 400,
                message: 'Author at ID not found'
            })
    }

    try {
        const updatedAuthor = req.body
        const options = {new:true}

        const result = await authorModel.findByIdAndUpdate(authorId, updatedAuthor, options)

        res.status(200)
            .send(result)

    } catch (e) {
        res
            .status(500)
            .send({
                message: e.message
            })
    }
})

authors.delete('/authors/:authorId', async (req, res) => {
    const {authorId} = req.params
    const authorExists = await AuthorModel.findById(authorId)

    if (!authorExists) {
        return res.status(400)
            .send({
                statusCode: 400,
                message: 'Author at ID not found'
            })
    }

    try {
        const result = await authorModel.findByIdAndDelete(authorId)

        res.status(200)
            .send({
                statusCode: 200,
                message: 'Author deleted',
                result
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