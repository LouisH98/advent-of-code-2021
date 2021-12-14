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

function applyStep(template) {
    let newTemplate = [...template];

    for (let i = 0; i < template.length; i++) {
        if(i == template.length -1) break;
        const pair = template[i] + template[i+1];
        const rule = findRule(pair);
        console.log(rule);
    }

    return newTemplate;
}

function part1(){
    let templateCopy = [...template];
    for (let i = 0; i < 10 ; i++) {
        templateCopy = applyStep(template);
    }
}

console.log(`Part 1: ${part1()}`);