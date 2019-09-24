const { _substr, Node } = require('../utils')

/**
 * 
 * @param {Class} converter 
 * @param {Object} node 
 * @param {Object} forEachPointer
 * @returns {void} 
 */
function arrayForEach(converter, node, forEachPointer) {

    const helpers = new Node(node)
    const code = converter.code

    if (helpers.NODE_PARAMS.length > 2) {
        converter.notSupported()
    } else {

        // fetch array name
        let arrayBeingManipulated = helpers.NODE_OBJECT.name

        // fetch first argument of forEach arrayBeingManipulated
        let firstArg = converter.firstArgumentOfLoop(node)
        let secondArg = helpers.NODE_PARAMS[1] ? helpers.NODE_PARAMS[1].name : null

        // fetch actual code inside forEach
        let codeInsideForEach = converter.codeInsideForEach(helpers.NODE_ARGS[0].body)

        const VARIABLE = converter.generateVariable()

        let insideForLoop = secondArg ?
            `let ${secondArg} = ${VARIABLE};
            let ${firstArg} = ${arrayBeingManipulated}[${secondArg}];`
            :
            `let ${firstArg} = ${arrayBeingManipulated}[${VARIABLE}];`
            ;

        // convert code to for loop
        let convertedCode = `for(let ${VARIABLE} = 0; ${VARIABLE} < ${arrayBeingManipulated}.length; ${VARIABLE}++) {
            ${insideForLoop}
            if(${firstArg} === undefined) continue;
            ${codeInsideForEach.trim()}
        }`;

        // track changes 
        let { start, end } = forEachPointer
        converter.changes.push({
            replace : _substr(code, start, end),
            code : convertedCode
        })
    }

}

module.exports = arrayForEach