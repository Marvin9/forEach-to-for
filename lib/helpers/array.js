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

    if (helpers.NODE_PARAMS.length > 3) {
        converter.notSupported()
    } else {

        // fetch array name
        let arrayBeingManipulated = helpers.NODE_OBJECT.name || null
        if (arrayBeingManipulated === null) {
            converter.notSupported()
            return;
        }

        // fetch first argument of forEach arrayBeingManipulated
        let firstArg = converter.firstArgumentOfLoop(node) || null
        let secondArg = helpers.NODE_PARAMS[1] ? helpers.NODE_PARAMS[1].name : null
        let thirdArg = helpers.NODE_PARAMS[2] ? helpers.NODE_PARAMS[2].name : null

        // fetch actual code inside forEach
        let codeInsideForEach = converter.codeInsideForEach(helpers.NODE_ARGS[0].body)

        const VARIABLE = converter.generateVariable()

        let insideForLoop = ''

        if (firstArg) {
            insideForLoop += `let ${firstArg} = ${arrayBeingManipulated}[${VARIABLE}];`;
            if (secondArg) {
                insideForLoop = `let ${secondArg} = ${VARIABLE}; let ${firstArg} = ${arrayBeingManipulated}[${secondArg}];`
                if (thirdArg) {
                    insideForLoop += `let ${thirdArg} = ${arrayBeingManipulated};`
                }
            }
        }
        
        // convert code to for loop
        let convertedCode = `for(let ${VARIABLE} = 0, ${VARIABLE}bound = ${arrayBeingManipulated}.length; ${VARIABLE} < ${VARIABLE}bound; ${VARIABLE}++) {
            ${insideForLoop}
            if(${firstArg} === undefined) continue;
            ${codeInsideForEach.trim()}
        }`;

        // track changes 
        let { start, end } = forEachPointer
        converter.changes.push({
            replace: _substr(code, start, end),
            code: convertedCode
        })
    }

}

module.exports = arrayForEach