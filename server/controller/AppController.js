const AppController = {
    index(request, response, next) {
        response.status(201).send('Hello Eduardo!')
    }
}

module.exports = AppController