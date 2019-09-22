//This output file is generated in runtime while running 'npm run test'
const object = {
    key: {
        childkey: "child value",
        nestedChild: {
            grandChildKey: "grand child value",
            anotherGrandChildKey: "another grand child value"
        }
    },
    anotherKey: {
        childkey: "another child value",
        nestedChild: {
            grandChildKey: "another grand child value",
            anotherGrandChildKey: "another grand child value"
        }
    }
}

for (const element in object) {
    for (const childElement in object[element]) {
        if (typeof object[element][childElement] === "object")
            for (const grandChildEle in object[element][childElement]) {
                console.log(object[element][childElement][grandChildEle])
            }
        else {
            console.log(object[element][childElement])
        }
    }
}