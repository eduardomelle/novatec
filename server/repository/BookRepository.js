const db = require('../config/mongo')

const BookRepository = {

    find(query, callback) {
        db.collection('books').find(query, callback)
    },

    byId(id, callback) {
        console.log('ID => ' + id)

        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').findOne(query, callback)
    }

}

module.exports = BookRepository