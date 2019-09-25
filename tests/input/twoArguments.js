const arr = [1, 2, 3, 4]
const object = {
    a : 1,
    b : 2,
    c : 3
}

arr.forEach((element, index) => {
    console.log(element + " " + index)
})

Object.keys(object).forEach((element, index) => {
    console.log(element + " " + index)
})