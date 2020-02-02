const app = require('../app')
const numCpus = require('os').cpus().length
console.log({numCpus})
const cluster = require('cluster')

// pm2 / forever

if (cluster.isMaster) {
    for (let i = 0; i < numCpus; i++) {
        cluster.fork()
    }
} else {
    app.listen(3000, () => {
        console.log('server is up')
    })
}
