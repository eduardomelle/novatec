console.log('process.env.NODE_ENV', process.env.NODE_ENV)

const mongojs = require('mongojs')
const db = mongojs('localhost:27017/novatec')
db.on('error', (err) => {
    console.log(err)
})

module.exports = db