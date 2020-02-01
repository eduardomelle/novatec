const AppController = {
    index(request, response, next) {
        response.status(201)
        response.send('Hello Eduardo!')
    }
}

module.exports = AppController