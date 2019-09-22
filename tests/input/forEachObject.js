const object = {
    key : "value",
    key2 : "value2",
    key3 : "value3"
}

Object.keys(object).forEach(element => {
    console.log(element + " : " + object[element])
})