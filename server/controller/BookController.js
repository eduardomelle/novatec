const repository = require('../repository/BookRepository')

const BookController = {

    list(request, response, next) {
        const name = new RegExp('^' + request.query.name, 'i')
        const query = request.query.name ? { name } : {}
        /*
        const query = {}
        if (request.query.name) {
            query.name = name
        }
        */
        repository.find(query, (err, data) => {
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
        const body = request.body

        repository.create(body, (err, data) => {
            response.status(201).json(data)
        })
    },

    update(request, response, next) {
        const id = request.params.id
        const body = request.body

        repository.update(id, body, (err, data) => {
            response.json(data)
        })
    },

    remove(request, response, next) {
        const id = request.params.id

        repository.remove(id, (err, data) => {
            response.sendStatus(204)
        })
    }

}

module.exports = BookController