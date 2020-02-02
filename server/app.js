const express = require('express')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('./route'))

app.use((request, response, next) => {
    var err = new Error('não achei')
    err.status = 404
    next(err)
})

app.use((err, request, response, next) => {
    response.status(err.status || 500).send(err.message)
    if (err.status !== 404) console.log(err.stack)
})

app.notFound = () => {
    let err = new Error('não achei')
    err.status = 404
    return err
}

app.locals.teste = 'teste locals'

app.use((request, response, next) => {
    request.banana = Math.random()
    response.locals.banana = Math.random()

    console.log('request.app', request.app.locals.teste)

    next()
})

module.exports = app