const fs = require('fs')
const path = require('path')

// lib
const CON = require('../lib/converter')


/*
*   @params : String
*   @return : Object
*   {
*       input : String,
*       output : String,
*       outputShouldBe : String
*   }
*/
async function testObject(filename) {
    return new Promise(resolve => {
        let input = fs.readFileSync(path.resolve(__dirname, `./${filename}.js`), 'utf8')
        let outputShouldBe = fs.readFileSync(path.resolve(__dirname, `./outputs/${filename}.output.js`), 'utf8')

        let converter = new CON(input)
        converter.convert()
        .then(convertedCode => {
            let output = convertedCode            
            resolve({
                input,
                outputShouldBe,
                output
            })
        })
    })
}

module.exports = testObject