const arr = [1, 2, 3, 4,,]
const object = {
    a : 1, 
    b : 2, 
    c : 3
}

function logs(array__) {
    array__.forEach((element, index, array) => {
        console.log(`${element} ${index} ${array}`)
    })
}

logs(arr)

Object.keys(object).forEach((element, index, array) => {
    console.log(`For Object : ${element} ${index} ${array}`)
})