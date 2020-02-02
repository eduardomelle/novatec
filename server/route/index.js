const router = require('express').Router()

const AppController = require('../controller/AppController')
const BookController = require('../controller/BookController')

router.get('/', AppController.index)
router.post('/login', AppController.login)
router.get('/crawler', AppController.fromRedis, AppController.crawler)
router.get('/ajax', AppController.ajax)

router.use('/books', require('./books'))

module.exports = router