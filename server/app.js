const express = require('express')

const app = express()
app.use(require('./route'))
app.listen(3000)