//This output file is generated in runtime while running 'npm run test'
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [6, 7, 8, 9, 0]
const arr3 = [1, 2, 3, 4, 5]
const arr4 = [6, 7, 8, 9, 0]

for (let ___a___ = 0; ___a___ < arr1.length; ___a___++) {
    let element = arr1[___a___];
    if (element === undefined) continue;
    console.log(element)
    for (let ___b___ = 0; ___b___ < arr2.length; ___b___++) {
        let element = arr2[___b___];
        if (element === undefined) continue;
        console.log(element)
        for (let ___c___ = 0; ___c___ < arr3.length; ___c___++) {
            let element = arr3[___c___];
            if (element === undefined) continue;
            console.log(element)
            for (let ___d___ = 0; ___d___ < arr4.length; ___d___++) {
                let element = arr4[___d___];
                if (element === undefined) continue;
                console.log(element)
            }
        }
    }
}