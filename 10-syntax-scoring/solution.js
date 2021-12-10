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

function getCorruptionScore(line, returnMissing = false){
    let tokenScores = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    }
    
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

    if(returnMissing) {
        return stack;
    }

    return valueToReturn;
}

function part1(){
    return inputFile.reduce((acc, line) => acc + getCorruptionScore(line), 0);
}

function part2(){
    let tokenScores = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
    }
    let incompleteLines = inputFile.filter(line => getCorruptionScore(line) === 0);
    let scores = [];
    incompleteLines.forEach(line => {
        let missingValues = getCorruptionScore(line, true).reverse().map(val => tokenPairs[val]);
        scores.push(missingValues.reduce((acc, val) => {
            acc *= 5
            acc += tokenScores[val]
            return acc
        }, 0))
    })

    return new Float64Array(scores).sort()[(Math.round(scores.length - 1) / 2)]
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);