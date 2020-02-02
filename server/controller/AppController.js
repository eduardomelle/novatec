const jwt = require('jwt-simple')
const SECRET = 'garrafa de agua'

const AppController = {
    index(request, response, next) {
        response.status(201).send('Hello Eduardo!')
    },

    login(request, response, next) {
        const user = request.body.user
        const pass = request.body.pass
        // const { user, pass } = response.body

        if (user === 'novatec' && pass === '123') {
            let date = new Date()
            date.setHours(date.getHours() + 1)

            const payload = {
                user: user,
                scope: [ 'read', 'write' ],
                validUntil: date
            }

            const token = jwt.encode(payload, SECRET)
            response.json({ token })
        } else {
            let err = new Error('saia daqui')
            err.status = 401
            next(err)
        }
    }
}

module.exports = AppController