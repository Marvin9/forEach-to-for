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
    },
    {
        test : 'four nested loops',
        file : 'fourNestedLoops'
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
        
            // compare
            expect(output).toBe(outputShouldBe)

        } catch(err) {throw new Error(err)}
    })
}