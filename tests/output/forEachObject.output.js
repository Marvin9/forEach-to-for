//This output file is generated in runtime while running 'npm run test'
const object = {
    key: "value",
    key2: "value2",
    key3: "value3"
}

for (const element in object) {
    console.log(element + " : " + object[element])
}