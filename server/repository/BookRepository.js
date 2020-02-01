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

    create() {

    },

    update(id, name, callback) {
        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').update(query, {$set:{name}}, {multi:false}, callback)
    },

    remove(id, callback) {
        const query = {
            _id: db.ObjectId(id)
        }

        db.collection('books').remove(query, callback)
    }

}

module.exports = BookRepository