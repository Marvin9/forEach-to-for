//This output file is generated in runtime while running 'npm run test'
const arr = [1, 2, 3, 4]
const object = {
    a : 1,
    b : 2,
    c : 3
}

for(let ___a___ = 0, ___a___bound = arr.length; ___a___ < ___a___bound; ___a___++) {
            let index = ___a___; let element = arr[index];
            if(element === undefined) continue;
            console.log(element + " " + index)
        }

for (const element in object) {
    let index = Object.keys(object).indexOf(element);
    console.log(element + " " + index)
}