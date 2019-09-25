//This output file is generated in runtime while running 'npm run test'
const arr = [1, 2, 3, 4,,]
const object = {
    a : 1, 
    b : 2, 
    c : 3
}

function logs(array__) {
    for(let ___a___ = 0, ___a___bound = array__.length; ___a___ < ___a___bound; ___a___++) {
            let index = ___a___; let element = array__[index];let array = array__;
            if(element === undefined) continue;
            console.log(`${element} ${index} ${array}`)
        }
}

logs(arr)

for (const element in object) {
    let array = Object.keys(object);
    let index = array.indexOf(element)
    console.log(`For Object : ${element} ${index} ${array}`)
}