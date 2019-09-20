const arr = [1, 2, 3]

function cool(arr) {
    let sum = 0
    for (let i = 0; i < arr.length; i++) {
        let element = arr[i];
        sum += element
    }
    return sum
}

cool(arr)