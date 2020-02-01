const BookRepository = {

    find(callback) {
        callback(null, [ { name: 'Node JS' }, { name: 'Python' } ])
    },

    byId(id, callback) {
        callback(null, { id: id, name: 'Java' })
    }

}

module.exports = BookRepository