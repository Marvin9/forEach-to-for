const fs = require('fs')
const path = require('path')
const exec = require('child_process').execSync

// lib
const CON = require('../lib/converter')



/**
 * 
 * @param {String} filename - input test's filename, eg. input.js -> filename should be "input"
 * @returns {object} - Object.output {String} 
 *                     Object.outputShouldBe {String}
 */

async function testObject(filename) {
    return new Promise((resolve, reject) => {

        let inputFilePath = path.resolve(__dirname, `./input/${filename}.js`),
            outputFilePath = path.resolve(__dirname, `./output/${filename}.output.js`)

        // execute the input file(containing forEach loop's), store it's output 
        let inputsOutput = exec(`node ${inputFilePath}`).toString()

        // get the code of input file, to convert it to for loops
        let input = fs.readFileSync(inputFilePath, 'utf8')
        
        //convert to for loops
        let converter = new CON(input)
        converter.convert()
        // get converted code
        .then(convertedCode => {
            let output = `//This output file is generated in runtime while running 'npm run test'
${convertedCode}`
            
            // write converted code to inputFileName.output.js file
            fs.writeFile(outputFilePath, output , (err,data) => {
                if(err) reject(err)

                // execute output
                let outputsOutput = exec(`node ${outputFilePath}`).toString()

                // return actual output & converted code's output to check
                resolve({
                    outputShouldBe : inputsOutput,
                    output : outputsOutput
                })
            })
        })
    })
}

module.exports = testObject