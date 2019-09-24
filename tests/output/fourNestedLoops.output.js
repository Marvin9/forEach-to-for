//This output file is generated in runtime while running 'npm run test'
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [6, 7, 8, 9, 0]
const arr3 = [1, 2, 3, 4, 5]
const arr4 = [6, 7, 8, 9, 0]

for (let ___a___ = 0; ___a___ < arr1.length; ___a___++) {
    let element = arr1[___a___];
    if (element === undefined) continue;
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
}