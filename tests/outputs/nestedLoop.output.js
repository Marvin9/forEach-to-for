const arr = [[1, 2], [3, 4], [5, 6]]

let totalSum = 0

for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    let individualSum = 0

    for (let i = 0; i < element.length; i++) {
        let ele = element[i];
        individualSum += ele
    }

    console.log(individualSum)
    totalSum += individualSum
}

console.log("Total : " + totalSum)