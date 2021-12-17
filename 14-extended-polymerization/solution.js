const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt')
                    .toString()
                    .replace(/\r/g, "")
                    .split('\n')
                    .filter(val => val.length);

const template = inputFile[0];
const rules = inputFile.slice(1).map(row => row.split(' -> '));

function findRule(pair) {
    return rules.find(rule => rule[0] === pair)[1];
}

function mostAndLeastOccuring(array) {
    let count = {};

    array.forEach(element => {
        if(!Object.keys(count).includes(element)) {
            count[element] = 0;
        }

        count[element]++;
    });

    let leastOccuring = {value: Number.MAX_VALUE, key: undefined}
    let mostOccuring = {value: Number.MIN_VALUE, key: undefined}
    Object.entries(count).forEach(([key, value]) => {
        if(value < leastOccuring.value) {
            leastOccuring = {key, value}
        }

        if(value > mostOccuring.value) {
            mostOccuring = {key, value}
        }
    });

    return {leastOccuring, mostOccuring};
}

function applyStep(template) {
    let newTemplate = [];

    for (let i = 0; i < template.length; i++) {
        if(i == template.length -1) break;
        const pair = template[i] + template[i+1];
        const rule = findRule(pair);
        if(i === 0) {
            newTemplate.push(template[i]);
        }
        newTemplate.push(rule, template[i+1]);
    }

    return newTemplate;
}

function part1(){
    let templateCopy = [...template];
    for (let i = 0; i < 40 ; i++) {
        templateCopy = applyStep(templateCopy);
    }

    const {leastOccuring, mostOccuring} = mostAndLeastOccuring(templateCopy);
    return mostOccuring.value - leastOccuring.value;
}

console.log(`Part 1: ${part1()}`);