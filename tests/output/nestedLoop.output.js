//This output file is generated in runtime while running 'npm run test'
const arr = [[1, 2], [3, 4], [5, 6]]

let totalSum = 0

for (let ___a___ = 0; ___a___ < arr.length; ___a___++) {
    let element = arr[___a___];
    if (element === undefined) continue;
    let individualSum = 0

    element.forEach(ele => {
        individualSum += ele
    })

    console.log(individualSum)
    totalSum += individualSum
}

console.log("Total : " + totalSum)