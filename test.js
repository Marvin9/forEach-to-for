const array = [1, 2, 3, [3, 5]];
array.forEach(function(element, index) {console.log(element)});
array.forEach((element, index) => {
    console.log(element)
  	element.forEach(ele => {
    	console.log(ele)
    })
})

function coolFunction(arr) {
    arr.forEach(element => {
        console.log(element)
    })
  	arr.forEach((element, ind) => {
        console.log(element)
    })
}