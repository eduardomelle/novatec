const repository = require('../repository/BookRepository')

const util = require('util')

repository.findAsync = util.promisify(repository.find)
repository.byId = util.promisify(repository.byId)

const BookController = {

    list: async function(request, response, next) {
        const name = new RegExp('^' + request.query.name, 'i')
        const query = request.query.name ? { name } : {}

        /*
        const query = {}
        if (request.query.name) {
            query.name = name
        }
        */

        /*
        // CALLBACK
        repository.find(query, (err, data) => {
            response.json(data)
        })
        */

        /*
        // PROMISE
        repository.findAsync(query)
        .then(data => response.json(data))
        .catch(err => next(err))
        */

        // ASYNC-AWAIT
        try {
            const data = await repository.findAsync(query)
            response.json(data)
        } catch(e) {
            next(e)
        }
    },

    byId(request, response, next) {
        const id = request.params.id

        /*
        repository.byId(id, (err, data) => {
            response.json(data)
        })
        */

        repository.byId(id)
        .then(data => response.json(data))
        .catch(err => next(err))
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