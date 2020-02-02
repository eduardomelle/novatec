const router = require('express').Router()
const pkg = require('../../package.json')

const AppController = require('../controller/AppController')

router.get('/', AppController.index)
router.post('/login', AppController.login)
router.get('/crawler', AppController.fromRedis, AppController.crawler)
router.get('/ajax', AppController.ajax)
router.get('/version', (request, response) => {
    response.json({ version: pkg.version })
})

router.use('/books', require('./books'))

module.exports = router