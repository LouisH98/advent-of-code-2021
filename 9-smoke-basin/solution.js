const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt')
                    .toString()
                    .replace(/\r/g, "")
                    .split('\n')
                    .map(row => row.split('').map(Number));


function isLowPoint(i, j, array) {
    const value = array[i][j];
    
    let isLeftHigher;
    let isAboveHigher;
    let isRightHigher;
    let isBelowHigher;
    
    leftValue = array[i][j-1];
    if(leftValue !== undefined){
        isLeftHigher = leftValue > value;
    } else {
        isLeftHigher = true;
    }

    try {
        isAboveHigher = array[i - 1][j] > value;
    } catch {
        isAboveHigher = true;
    }

    rightValue = array[i][j + 1];
    if(rightValue !== undefined) {
        isRightHigher = rightValue > value;
    } else {
        isRightHigher = true;
    }

    try {
        isBelowHigher = array[i + 1][j] > value;
    } catch  {
        isBelowHigher = true;
    }


    return isLeftHigher && isAboveHigher && isRightHigher && isBelowHigher;
}


function findBasin(i, j, array) {
    let currentBasin = [];
    let expanding = true;

    let currentXTarget = i;
    let currentYTarget = j;

    while(expanding) {
        for (let x = -currentXTarget; i <= currentXTarget; x++) {
            for (let y = -currentYTarget; y <= currentYTarget; y++) {
                let value;
                try {
                    value = array[x][y];
                } catch {
                    continue;
                }
            }        
        }

        currentXTarget++;
        currentYTarget++;
    }
   

    return currentBasin;
}

function findBasins(array){
    let basins = [];
    for (let i = 0; i < array.length; i++) {
        const row = array[i];
        for (let j = 0; j < row.length; j++) {
            const value = array[i][j];
            if(isLowPoint(i, j, inputFile)) {
                basins.push(findBasin(i, j, inputFile))
            }
        }
    }
}

function part1(){
    let riskLevel = 0;

    for (let i = 0; i < inputFile.length; i++) {
        const row = inputFile[i];
        for (let j = 0; j < row.length; j++) {
            const value = inputFile[i][j];
            if(isLowPoint(i, j, inputFile)) {
                riskLevel += (value + 1);
            }
            
        }
    }

    return riskLevel;
}

console.log(`Part 1: ${part1()}`);