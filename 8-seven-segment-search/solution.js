const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt').toString().replace(/\r/g, "").split('\n');

console.log(inputFile);

const easyMap = {
    2: 1,
    3: 7,
    4: 4,
    7: 8
}

function part1(){
    let countOfeasy = 0;

    inputFile.forEach(signalPattern => {
        const outputValues = signalPattern.split("|")[1].split(' ');

        outputValues.forEach(value => {
            console.log(value);
            if(Object.keys(easyMap).map(Number).includes(value.length)) {
                countOfeasy++;
            }
        })
    });

    return countOfeasy;
}

function part2(){
    inputFile.forEach(signalPattern => {
        const [inputValues, outputValues] = signalPattern.split("|")
    }) 
}

console.log(`Part 1: ${part1()}`);