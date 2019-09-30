#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const exec = require('child_process').execSync

const CON = require('./lib/converter')

try {
        
    const entryFile = process.argv[2] || null
    const outputFile = process.argv[3] || null

    if(entryFile === null || outputFile === null) {
        const command = `\x1b[36mnode index /path/to/entry.js /path/to/output.js\x1b[0m`
        if(entryFile === null) {
            throw new Error("Entry file must be defined -> " + command)
        } else {
            throw new Error("Output file must be defined -> " + command)
        }
    }

    const entryPath = entryFile
    const outputPath = outputFile


    const code = fs.readFileSync(entryPath, 'utf8')

    let converter = new CON(code)

    converter.convert()
        .then(convertedCode => {

            fs.writeFile(outputPath, convertedCode, err => {

                if(err) throw err 
                console.log(`\x1b[46mOutput\x1b[0m : ${outputPath}`)

                if(process.argv.indexOf('--execute') !== -1) {
                    let output = exec(`node ${outputPath}`).toString()
                    console.log(`---------------------- OUTPUT --------------------`)
                    console.log(output)
                }

            })

        })

} catch(err) {
    throw err 
}