const mongoose = require('../config/mongoose')

const BookSchema = new mongoose.Schema({
    name: { name: String },
    pages: { type: Number, min: 1},
    authors: [String]
})

module.exports = mongoose.model('Book', BookSchema)