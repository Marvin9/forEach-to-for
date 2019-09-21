
const CON = require('../lib/converter')
const fs = require('fs')

const code = `

    const arr1 = [1, 2, 3, 4, 5]
    const arr2 = [6, 7, 8, 9, 0]
    const arr3 = [1, 2, 3, 4, 5]
    const arr4 = [6, 7, 8, 9, 0]

    arr1.forEach((element, index) => {
        console.log(element)
        arr2.forEach(element => {
            console.log(arr1[index])
            arr3.forEach(element => {
                console.log(element)
                arr4.forEach(element => {
                    console.log(element)
                })
            })
        })
    })
`

const converter = new CON(code)

console.time("CONVERSION_PERFORMANCE")
converter.convert().then(_ => {
    console.timeEnd("CONVERSION_PERFORMANCE")
    fs.writeFile('output.js', _, err => {
        if(err) throw new Error(err)
    })
})
