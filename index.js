const fs = require('fs')
const path = require('path')

const CON = require('./lib/converter')

try {
        
    const entryFile = process.argv[2]
    const outputFile = process.argv[3]

    const entryPath = path.resolve(__dirname, entryFile)
    const outputPath = path.resolve(__dirname, outputFile)


    const code = fs.readFileSync(entryPath, 'utf8')

    let converter = new CON(code)

    converter.convert()
        .then(convertedCode => {

            fs.writeFile(outputPath, convertedCode, err => {

                if(err) throw err 
                console.log(`Output : ${outputPath}`)

            })

        })

} catch(err) {
    throw err 
}