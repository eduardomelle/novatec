const app = require('../server/app')
const request = require('supertest')(app)
const assert = require('assert')
const db = require('../server/config/mongo')

describe('Routes Book', () => {

    let id;

    before((done) => {
        const book = { 'name': 'Do Mil ao Milhão' }
        db.collection('books').insert(book, (err, data) => {
            id = data._id.toString()
            done()
        })
    })

    after((done) => {
        db.collection('books').remove({}, done)
    })

    it('GET /books should list', () => {
        return request.get('/books')
        .then(result => {
            assert.equal(result.status, 200)
            assert.equal(result.body[0].name, 'Do Mil ao Milhão')
        })
    })

    it('GET /books/:id should get a book', () => {
        return request.get(`/books/${id}`)
        then(result => {
            assert.equal(result.status, 200)
            assert.equal(result.body._id, id)
            assert.equal(result.body.name, 'Do Mil ao Milhão')
        })
    })

    it('POST /books should create a book', () => {
        const book = { name: 'Sem fim', pages: 200 }
        return request.post('/books')
        .send(book)
        .then(result => {
            assert.equal(result.status, 201)
            assert.ok(result.body._id, id)
        })
    })

    it('PUT /books/:id should update a book', (done) => {
        request.put(`/books/${id}`)
        .send({ pages: 205 })
        .then(result => {
            assert.equal(result.status, 200)

            db.collection('books').findOne({ _id: db.ObjectId(id) }, (err, data) => {
                assert.equal(data.pages, 205)

                done()
            })
        })
    })

    it('DELETE /books/:id should remove', () => {
        return request.delete(`/books/${id}`)
        .then(result => {
            assert.equal(result.status, 204)
        })
    })

})