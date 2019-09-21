//This output file is generated in runtime while running 'npm run test'
const arr = [
    [1, 2],
    [3, 4],
    [5, 6]
]

let totalSum = 0

for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (element === undefined) continue;
    let individualSum = 0

    for (let i = 0; i < element.length; i++) {
        let ele = element[i];
        if (ele === undefined) continue;
        individualSum += ele
    }

    console.log(individualSum)
    totalSum += individualSum
}

console.log("Total : " + totalSum)