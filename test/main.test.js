const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')

describe('Books API', () => {

    it('GET / should respond some text', (done) => {
        request.get('/')
        .then(result => {
            assert.equal(result.text, 'Hello Eduardo!')
            assert.equal(result.status, 201)

            done()
        })
        .catch(err => done(err))
    })

    it('GET /banana should return not found', () => {
        return request.get('/banana')
        .then(result => {
            assert.equal(result.status, 404)
        })
    })

})