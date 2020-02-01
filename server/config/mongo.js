console.log('process.env.NODE_ENV', process.env.NODE_ENV)

let uri = process.env.NODE_ENV === 'dev' ? 'localhost:27017/novatec' : 'localhost:27017/novatec-test'

const mongojs = require('mongojs')
const db = mongojs(uri)
db.on('error', (err) => {
    console.log(err)
})

module.exports = db