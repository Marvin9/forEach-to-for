const { _substr, Node, async_beautify } = require('../utils')

/**
 * 
 * @param {ClassDecorator} converter 
 * @param {Object} node currently iterating node
 * @param {Object} forEachPointer pointer of block containing forEach
 * @returns {void}
 */
function objectforEachToFor(converter, node, forEachPointer) {

    // NODE VARIABLE
    const helpers = new Node(node)
    const code = converter.code

    // only one argument supported for objects
    if(helpers.NODE_PARAMS.length > 3) {
        converter.notSupported()
    } else {

        // fetch object
        let objectNameStart = helpers.NODE_OBJECT_ARGS[0].start,
            objectNameEnd = helpers.NODE_OBJECT_ARGS[0].end
        
        let objectName = _substr(code, objectNameStart, objectNameEnd)

        let { firstArg, secondArg, thirdArg } = converter.fetchArguments(node)

        let codeInsideForEach = converter.codeInsideForEach(helpers.NODE_ARGS[0].body)

        let convertedCode = '', codePrefix = `for(const ${firstArg} in ${objectName}) {`,
            codePostfix = `
    ${codeInsideForEach.trim()}
            }`

        if(firstArg) {
            convertedCode = codePrefix
            if(secondArg) {
                convertedCode += `
        let ${secondArg} = Object.keys(${objectName}).indexOf(${firstArg});`
                if(thirdArg) {
                    convertedCode = `${codePrefix}
            let ${thirdArg} = Object.keys(${objectName});
            let ${secondArg} = ${thirdArg}.indexOf(${firstArg})`
                }
            }
            convertedCode += codePostfix
        }

        let { start, end } = forEachPointer

        async_beautify(convertedCode)
            .then(beautifiedCode => {
                converter.changes.push({
                    replace : code.substr(start, end - start),
                    code : beautifiedCode
                })
            })
    }

}

module.exports = objectforEachToFor