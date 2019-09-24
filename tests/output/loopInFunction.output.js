//This output file is generated in runtime while running 'npm run test'
const arr = [1, 2, 3]

function cool(arr) {
    let sum = 0
    for (let ___a___ = 0; ___a___ < arr.length; ___a___++) {
    let element = arr[___a___];
    if (element === undefined) continue;
    sum += element
}
    return sum
}

cool(arr)