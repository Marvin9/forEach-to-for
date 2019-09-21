const array = [1, 2, 3, [3, 5]];
array.forEach(function(element, index) {console.log(element)});
array.forEach((element, index) => {
    console.log(element)
})

function coolFunction(arr) {
    arr.forEach(element => {
        console.log(element)
    })
  	arr.forEach((element, ind) => {
        console.log(element)
    })
}

const json = {a : 1, b : 2}

Object.keys(json).forEach(ele => {
    console.log(json[ele])
})