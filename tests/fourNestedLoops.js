const arr1 = [1, 2, 3, 4, 5]
const arr2 = [6, 7, 8, 9, 0]
const arr3 = [1, 2, 3, 4, 5]
const arr4 = [6, 7, 8, 9, 0]

arr1.forEach(element => {
    console.log(element)
    arr2.forEach(element => {
        console.log(element)
        arr3.forEach(element => {
            console.log(element)
            arr4.forEach(element => {
                console.log(element)
            })
        })
    })
})