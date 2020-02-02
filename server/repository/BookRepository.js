const db = require('../config/mongo')
const SIZE = 5

const BookRepository = {

    find(query, page = 1, callback) {
        if (page == '' || page == 0) {
            page = 1
        } 

        const skip = (page - 1) * SIZE
        
        db.collection('books')
            .find(query)
            .limit(SIZE)
            .skip(skip, callback)
    },

    count(query, callback) {
        db.collection('books').count(query, callback)
    },

    byId(id, callback) {
        console.log('ID => ' + id)

        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').findOne(query, callback)
    },

    create(data, callback) {
        db.collection('books').insert(data, callback)
    },

    update(id, data, callback) {
        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').update(query, {$set:data}, callback)
    },

    remove(id, callback) {
        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').remove(query, callback)
    }

}

module.exports = BookRepository