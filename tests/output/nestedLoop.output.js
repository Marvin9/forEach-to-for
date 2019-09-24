//This output file is generated in runtime while running 'npm run test'
const arr = [[1, 2], [3, 4], [5, 6]]

let totalSum = 0

for(let ___a___ = 0, ___a___bound = arr.length; ___a___ < ___a___bound; ___a___++) {
            let element = arr[___a___];
            if(element === undefined) continue;
            let individualSum = 0

    for(let ___b___ = 0, ___b___bound = element.length; ___b___ < ___b___bound; ___b___++) {
            let ele = element[___b___];
            if(ele === undefined) continue;
            individualSum += ele
        }

    console.log(individualSum)
    totalSum += individualSum
        }

console.log("Total : " + totalSum)