const repository = require('../repository/BookRepository')

const BookController = {

    list(request, response, next) {
        repository.find((err, data) => {
            response.json(data)
        })
    },

    byId(request, response, next) {
        const id = request.params.id
        
        repository.byId(id, (err, data) => {
            response.json(data)
        })
    },

    create(request, response, next) {
        response.status(201).send('create')
    },

    update(request, response, next) {
        response.send('update')
    },

    remove(request, response, next) {
        response.send('remove')
    }

}

module.exports = BookController