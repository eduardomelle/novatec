const jwt = require('jwt-simple')
const SECRET = 'garrafa de agua'

const axios = require('axios')
const cheerio = require('cheerio')

const redis = require('../config/redis')

const AppController = {
    index(request, response, next) {
        response.status(201).send('Hello Eduardo!')
    },

    login(request, response, next) {
        const user = request.body.user
        const pass = request.body.pass
        // const { user, pass } = response.body

        if (user === 'novatec' && pass === '123') {
            let date = new Date()
            date.setHours(date.getHours() + 1)

            const payload = {
                user: user,
                scope: [ 'read', 'write' ],
                validUntil: date
            }

            const token = jwt.encode(payload, SECRET)

            redis.set('token', token, 'EX', 60)

            response.json({ token })
        } else {
            let err = new Error('saia daqui')
            err.status = 401
            next(err)
        }
    },

    verifyJwt(request, response, next) {
        let token = request.headers.authorization || request.headers['x-jwt'] || request.query.token
        token = token.replace('Bearer ', '')
        console.log('TOKEN => ' + token)

        try {
            const payload = jwt.decode(token, SECRET)
            if (new Date(payload.validUntil) >= new Date()) {
                return next()
            }

            throw new Error('saia daqui')
        } catch(e) {
            e.stack = 401
            next(e)
        }
    },

    crawler(request, response, next) {
        axios.get('https://www.belezanaweb.com.br/')
        .then(result => {
            const $ = cheerio.load(result.data)
            const $showcaseItem = $('.showcase-item')

            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })

            let html = ''
            html += ('<table border=1>')
            html += (`<tr>
                    <th>Nome</th>
                    <th>Preços</th>
                </tr>`)

            for (let i = 0; i < $showcaseItem.length; i++) {
                const $price = $($($showcaseItem[i]).find('.item-price-value')).text()
                const $name = $($($showcaseItem[i]).find('.showcase-item-name')).text()

                html += (`<tr>
                        <td>${$name}</td>
                        <td>${$price}</td>
                    </tr>`)
            }

            html += '</table>'

            redis.set('emelle:blz:price', html, 'EX', 60)

            response.end(html)
        })
    },

    fromRedis(request, response, next) {
        redis.get('emelle:blz:price', (err, data) => {
            if (data) return response.send(data)

            next()
        })
    }
}

module.exports = AppController