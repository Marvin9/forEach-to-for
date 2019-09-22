const beautify = require('js-beautify').js
const acorn = require('acorn')

class converter {
    constructor(code) {
        try {
            this.ast = acorn.parse(code)
        } catch (parsingError) {
            throw new Error(parsingError)
        }
        this.code = code
        this.changes = []
        this.convertedCode

        this.argumentWarning = 0
    }

    async iterateNodes(node = this.ast, forEachPointer = { start: 0, end: 0 }) {

        if (node) {
            switch (node.type) {
                case "Program": case "BlockStatement":
                    for (let i = 0; i < node.body.length; i++) this.iterateNodes(node.body[i]);
                    break;

                case "ExpressionStatement":
                    this.iterateNodes(node.expression, { start: node.start, end: node.end });
                    break;

                case "ArrowFunctionExpression": case "FunctionExpression": case "FunctionDeclaration":
                    this.iterateNodes(node.body);
                    break;

                case "CallExpression":

                    //TODO divide single file to different modules

                    if (node.callee.type === "MemberExpression" && node.callee.property.name === "forEach") {

                        // forEach object
                        if (node.callee.object.type === "CallExpression") {

                            if (node.arguments[0].params.length > 1) {
                                this.notSupported()
                            } else {

                                // fetch object
                                let objectNameStart = node.callee.object.arguments[0].start, objectNameEnd = node.callee.object.arguments[0].end
                                let objectName = this.code.substr(objectNameStart, objectNameEnd - objectNameStart)

                                let firstArg = this.firstArgumentOfLoop(node)

                                let codeInsideForEach = this.codeInsideForEach(node.arguments[0].body)

                                let convertedCode = `for(const ${firstArg} in ${objectName}) {
                                    ${codeInsideForEach.trim()}
                                }`;

                                this.changes.push({
                                    replace: this.code.substr(forEachPointer.start, forEachPointer.end - forEachPointer.start),
                                    code: convertedCode
                                })
                            }
                        } else { //forEach array

                            if (node.arguments[0].params.length > 2) {
                                this.notSupported()
                            } else {

                                // 2 -> fetch array which is being manipulated eg. arrayBeingManipulated.forEach......
                                let arrayBeingManipulated = node.callee.object.name

                                // 3 -> fetch first argument of forEach arrayBeingManipulated.forEach(firstArg => ...)
                                let firstArg = this.firstArgumentOfLoop(node)
                                let secondArg = node.arguments[0].params[1] ? node.arguments[0].params[1].name : null

                                // 4 -> fetch actual code inside forEach
                                let codeInsideForEach = this.codeInsideForEach(node.arguments[0].body)

                                let insideForLoop = secondArg ?
                                    `let ${firstArg} = ${arrayBeingManipulated}[i];
                                                                    let ${secondArg} = i;`
                                    :
                                    `let ${firstArg} = ${arrayBeingManipulated}[i];`
                                    ;

                                // 5 -> convert code to for loop
                                let convertedCode = `for(let i = 0; i < ${arrayBeingManipulated}.length; i++) {
                                            ${insideForLoop}
                                            if(${firstArg} === undefined) continue;
                                            ${codeInsideForEach.trim()}
                                        }`;

                                // 7 -> track the changes to be made
                                this.changes.push({
                                    replace: this.code.substr(forEachPointer.start, forEachPointer.end - forEachPointer.start),
                                    code: convertedCode
                                })

                            }
                        }
                    }
                    for (let i = 0; i < node.arguments.length; i++) this.iterateNodes(node.arguments[i])
                    break;
            }
        }
    }

    async convert() {
        this.convertedCode = this.code

        return this.iterateNodes()
            .then(() => {

                // 8 -> apply the changes to string
                this.changes.forEach(element => {
                    this.convertedCode = this.convertedCode.replace(element.replace, element.code)
                })

                // 9 -> return beautified code
                return beautify(this.convertedCode)
            })
            .catch(err => {
                throw err
            })
    }

    firstArgumentOfLoop(node) {
        return node.arguments[0].params[0].name || null
    }

    codeInsideForEach(pointers) {
        let { start, end } = pointers
        return this.code.substr(start + 1, end - start - 2)
    }

    notSupported() {
        if (!this.argumentWarning) {
            console.log('\n')
            console.log('\x1b[47m\x1b[31m%s\x1b[0m',"Some forEach Loop may not be converted. See documentation for more")
            console.log('\n')
            this.argumentWarning = 1
        }
    }
}

module.exports = converter