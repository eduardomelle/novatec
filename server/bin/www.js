const app = require('../app')
const numCpus = require('os').cpus().length
console.log({numCpus})
const cluster = require('cluster')

// pm2 / forever
if (cluster.isMaster) {
    for (let i = 0; i < numCpus; i++) {
        let work = cluster.fork()
        work.on('exit', () => {
            console.log('worker died')
        })
    }
} else {
    app.listen(3000, () => {
        console.log('server is up')
    })
}

/*
app.listen(3000, () => {
    console.log('server is up')
})
*/
