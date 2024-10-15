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




module.exports = authors