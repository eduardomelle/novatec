const router = require('express').Router()

const AppController = require('../controller/AppController')
const BookController = require('../controller/BookController')

router.get('/', AppController.index)
router.post('/login', AppController.login)
router.get('/crawler', AppController.crawler)

router.get('/books', AppController.verifyJwt, BookController.list)
router.get('/books/:id', BookController.byId)
router.post('/books', BookController.create)
router.put('/books/:id', BookController.update)
router.delete('/books/:id', BookController.remove)

module.exports = router