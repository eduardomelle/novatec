const jwt = require('jwt-simple')
const SECRET = 'garrafa de agua'

const axios = require('axios')
const cheerio = require('cheerio')

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

            response.write('<table border=1>')
            response.write(`<tr>
                    <th>Nome</th>
                    <th>Preços</th>
                </tr>`)

            for (let i = 0; i < $showcaseItem.length; i++) {
                const $price = $($($showcaseItem[i]).find('.item-price-value')).text()
                const $name = $($($showcaseItem[i]).find('.showcase-item-name')).text()

                response.write(`<tr>
                        <td>${$name}</td>
                        <td>${$price}</td>
                    </tr>`)
            }
            
            response.end('</table>')
        })
    }
}

module.exports = AppController