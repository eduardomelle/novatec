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
        response.status(201).send('create')
    },

    update(request, response, next) {
        const id = request.params.id
        const name = request.params.name

        repository.update(id, name, (err, data) => {
            response.send('Atualizado com sucesso!')
        })
    },

    remove(request, response, next) {
        const id = request.params.id

        repository.remove(id, (err, data) => {
            response.send('Removido com sucesso!')
        })
    }

}

module.exports = BookController