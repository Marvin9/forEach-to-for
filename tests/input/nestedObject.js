const object = {
    key : {
        childkey : "child value",
        nestedChild : {
            grandChildKey : "grand child value",
            anotherGrandChildKey : "another grand child value"
        }
    },
    anotherKey : {
        childkey : "another child value",
        nestedChild : {
            grandChildKey : "another grand child value",
            anotherGrandChildKey : "another grand child value"
        }
    }
}

Object.keys(object).forEach(element => {
    Object.keys(object[element]).forEach(childElement => {

        if(typeof object[element][childElement] === "object")
            Object.keys(object[element][childElement]).forEach(grandChildEle => {
                console.log(object[element][childElement][grandChildEle])
            })
        else {
            console.log(object[element][childElement])
        }
    })
})