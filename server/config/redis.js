const redis = require('redis')

// const host = '10.0.2.153'
const host = 'localhost'
const client = redis.createClient({ host })

client.on('error', (err) => {
    console.log(err)
})

module.exports = client