//This output file is generated in runtime while running 'npm run test'
const arr = [1, 2, 3]

function cool(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        if (element === undefined) continue;
        sum += element
    }
    return sum
}

cool(arr)