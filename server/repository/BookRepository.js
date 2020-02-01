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
    },

    create(data, callback) {
        db.collection('books').insert(data, callback)
    },

    update(id, data, callback) {
        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').update(query, {$set:{name: data.name, pages: data.pages}}, {multi:false}, callback)
    },

    remove(id, callback) {
        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').remove(query, callback)
    }

}

module.exports = BookRepository