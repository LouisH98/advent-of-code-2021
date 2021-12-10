const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt')
                    .toString()
                    .replace(/\r/g, "")
                    .split('\n')
                    .map(row => row.split('').map(Number));


function isLowPoint(i, j, array) {
    const value = array[i][j];

    const isLeftHigher = array[i][j-1] === undefined ? true : array[i][j-1] > value;
    const isAboveHigher = array[i - 1] === undefined ? true : array[i - 1][j] > value;
    const isRightHigher = array[i][j+1] === undefined ? true : array[i][j+1] > value;
    const isBelowHigher = array[i + 1] === undefined ? true : array[i + 1][j] > value;

    return isLeftHigher && isAboveHigher && isRightHigher && isBelowHigher;
}


function findBasin(i, j, array) {
   let basinCoords = [];

   
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