const router = require('express').Router()

const AppController = require('../controller/AppController')
const BookController = require('../controller/BookController')

router.get('/', AppController.index)

router.get('/books', BookController.list)
router.get('/books/:id', BookController.byId)
router.post('/books', BookController.create)
router.put('/books/:id/:name', BookController.update)
router.delete('/books/:id', BookController.remove)

module.exports = router