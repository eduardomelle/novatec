let uri = process.env.NODE_ENV === 'dev' ?
    'mongodb://localhost:27017/novatec' :
    'mongodb://localhost:27017/novatec-test'

const mongoose = require('mongoose')
const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.on('error', (err) => {
    console.log(err)
})

module.exports = mongoose