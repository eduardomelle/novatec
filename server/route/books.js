const router = require('express').Router()
const BookController = require('../controller/BookController')

// router.get('/books', AppController.verifyJwt, AppController.getPersonRedis, BookController.list)
router.get('/', BookController.list)
router.get('/:id', BookController.byId)
router.post('/', BookController.create)
router.put('/:id', BookController.update)
router.delete('/:id', BookController.remove)

module.exports = router