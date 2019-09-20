const testObject = require('./util')

let filename

const tests = [
    {
        test : 'single forEach loop',
        file : 'singleforEach'
    },
    {
        test : 'loop inside a function',
        file : 'loopInFunction'
    },
    {
        test : 'nested loops',
        file : 'nestedLoop'
    }
]

for(let i = 0; i < tests.length; i++) {
    const _test = tests[i]

    // _test.test -> test name
    test(_test.test, async () => {

        // filenaming for input and output is in same format -> input.js input.output.js
        filename = _test.file 

        try {

        // object with hardcoded output and output with converter
            let {output, outputShouldBe} = await testObject(filename)
            
            // remove space and next line because intendation is not focused in this test
            output = output.replace(/[ |\r?\n]/g, '')
            outputShouldBe = outputShouldBe.replace(/[ |\r?\n]/g, '')

            // compare
            expect(output).toBe(outputShouldBe)

        } catch(err) {throw new Error(err)}
    })
}