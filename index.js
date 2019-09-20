const fs = require('fs')

const code = fs.readFileSync('./tests/singleforEach.js', 'utf8')

const CON = require('./lib/converter')

const converter = new CON(code)

converter.convert().then(convertedCode => {
    console.log(convertedCode)
}).catch(err => {
    console.log(err)
})

