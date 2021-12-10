const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt')
                    .toString()
                    .split("\r\n");

let tokenPairs = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
};

let tokenScores = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
}

function getCorruptionScore(line){
    let stack = [];
    let valueToReturn = 0;
    line.split('').forEach(char => {
        if(Object.keys(tokenPairs).includes(char)) {
            stack.push(char);
        } else {
            const poppedValue = stack.pop();
            const expectedValue = tokenPairs[poppedValue];
            if(poppedValue !== undefined && char !== expectedValue) {
                console.log(`Expected ${expectedValue}, found: ${char} => ${tokenScores[char]}`);
                valueToReturn = tokenScores[char];
            }
        }
    })
    return valueToReturn;
}

function part1(){
    return inputFile.reduce((acc, line) => acc + getCorruptionScore(line), 0);
}

console.log(`Part 1: ${part1()}`);