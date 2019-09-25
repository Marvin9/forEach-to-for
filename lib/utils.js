const beautify = require('js-beautify').js

/**
 * 
 * @param {String} str 
 * @param {number} start 
 * @param {number} end 
 * @returns {String} returns part of string
 */
function _substr(str, start, end) {
    return str.substr(start, end - start)
}

class Node {
    constructor(node) {
        this.NODE_ARGS = node.arguments || null 
        this.NODE_CALLEE = node.callee || null
        this.NODE_OBJECT = this.NODE_CALLEE ? this.NODE_CALLEE.object : null
        this.NODE_OBJECT_ARGS = this.NODE_OBJECT ? this.NODE_OBJECT.arguments : null
        this.NODE_PARAMS = this.NODE_ARGS ? this.NODE_ARGS[0].params : null
    }
}

async function async_beautify(code) {
    return new Promise(resolve => {
        let beautifiedCode = beautify(code)
        resolve(beautifiedCode)
    })
}

module.exports = {
    _substr,
    Node,
    async_beautify
}