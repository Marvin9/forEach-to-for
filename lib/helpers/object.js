const { _substr, Node } = require('../utils')

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
    if(helpers.NODE_PARAMS.length > 1) {
        converter.notSupported()
    } else {

        // fetch object
        let objectNameStart = helpers.NODE_OBJECT_ARGS[0].start,
            objectNameEnd = helpers.NODE_OBJECT_ARGS[0].end
        
        let objectName = _substr(code, objectNameStart, objectNameEnd)

        let firstArg = converter.firstArgumentOfLoop(node)

        let codeInsideForEach = converter.codeInsideForEach(helpers.NODE_ARGS[0].body)

        let convertedCode = `for(const ${firstArg} in ${objectName}) {
            ${codeInsideForEach.trim()}
        }`

        let { start, end } = forEachPointer

        converter.changes.push({
            replace : code.substr(start, end - start),
            code : convertedCode
        })
    }

}

module.exports = objectforEachToFor