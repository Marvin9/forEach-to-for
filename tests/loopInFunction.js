const arr = [1, 2, 3]

function cool(arr) {
    let sum = 0
    arr.forEach(element => {
        sum += element
    })
    return sum
}

cool(arr)