const arr = [[1, 2], [3, 4], [5, 6]]

let totalSum = 0

arr.forEach(element => {
    let individualSum = 0

    element.forEach(ele => {
        individualSum += ele
    })

    console.log(individualSum)
    totalSum += individualSum
})

console.log("Total : " + totalSum)