const acorn = require('acorn')
const objectForEach = require('./helpers/object')
const arrayForEach = require('./helpers/array')
const { _substr } = require('./utils')

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
        this.variablesHelpers = {
            pointer : 0,
            variableUsed : {}
        }
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

                case "ArrowFunctionExpression": case "FunctionExpression": case "FunctionDeclaration": case "ForStatement" : case "DoWhileStatement" : case "WhileStatement" :
                    this.iterateNodes(node.body);
                    break;

                case "CallExpression":

                    //TODO divide single file to different modules

                    if (node.callee.type === "MemberExpression" && node.callee.property.name === "forEach") {
                        // forEach object
                        if (node.callee.object.type === "CallExpression") {
                            objectForEach(this, node, forEachPointer)
                        } else { 
                            //forEach array
                            arrayForEach(this, node, forEachPointer)
                        }

                    }
                    for (let i = 0; i < node.arguments.length; i++) this.iterateNodes(node.arguments[i])
                    break;
                
                case "IfStatement" :
                    this.iterateNodes(node.consequent)
                    this.iterateNodes(node.alternate)
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
                return this.convertedCode
            })
            .catch(err => {
                throw err
            })
    }

    firstArgumentOfLoop(node) {
        return node.arguments[0].params[0] ? node.arguments[0].params[0].name : null
    }

    codeInsideForEach(pointers) {
        let { start, end } = pointers
        return _substr(this.code, start +1, end - 1)
    }

    notSupported() {
        if (!this.argumentWarning) {
            console.log('\n')
            console.log('\x1b[47m\x1b[31m%s\x1b[0m',"Some forEach Loop may not be converted. See documentation for more")
            console.log('\n')
            this.argumentWarning = 1
        }
    }

    generateVariable() {
        const variables = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        this.variablesHelpers.pointer %= variables.length

        this.variablesHelpers["variableUsed"][variables[this.variablesHelpers.pointer]] = 1
        return `___${variables[this.variablesHelpers.pointer++]}___`
    }
}

module.exports = converter