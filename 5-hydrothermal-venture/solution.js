const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt')
                    .toString()
                    .split("\n")
                    .map(row => row.split("->")
                    .map(elem => elem.trim().split(",")
                    .map(Number)));

function findMaxValue() {
    let maxVal = 0;

    inputFile.forEach(row => {
        row.flat().forEach(value => {
            if(value > maxVal) {
                maxVal = value;
            }
        })
    })

    return maxVal;
}

function create2DArray(size){
    return Array(size).fill(0).map(y => Array(size).fill(0))
}

function mapVent(array, ventTuple) {
    let [x1, y1] = ventTuple[0];
    let [x2, y2] = ventTuple[1];

    if(isHorizontalOrVertical(ventTuple)) {
        if(x1 == x2) { 
            let offsetValue = y1 > y2 ? -1 : 1;
            for (let y = y1; y !== y2 + offsetValue; y += offsetValue) {
                array[x1][y] += 1;
            }
        }
    
        if(y1 === y2) {
            let offsetValue = x1 > x2 ? -1 : 1;
    
            for (let x = x1; x !== x2 + offsetValue; x += offsetValue) {
                array[x][y1] += 1;
            }
        }
    } else {
        let x = x1;
        let y = y1;
        const offsetValueX = x > x2 ? -1 : 1;
        const offsetValueY = y > y2 ? -1 : 1;
        while(x !== x2 + offsetValueX && y !== y2 + offsetValueY) {
            array[x][y]++;
            x += offsetValueX;
            y += offsetValueY;
        }
    }
}

function isHorizontalOrVertical(ventTuple) {
    const [x1, y1] = ventTuple[0];
    const [x2, y2] = ventTuple[1];

    return x1 === x2 || y1 === y2;
}

function getCoordsOfOverlap(array){
    let coords = [];
    for (let i = 0; i < array.length; i++) {
        const row = array[i];
        for (let j = 0; j < row.length; j++) {
            const cell = array[i][j];
            if(cell > 1) {
                coords.push([i, j])
            }
        }
    }
    return coords;
}


function part1(){
    const max = findMaxValue();
    const array = create2DArray(max);

    for(const line of inputFile) {
        if(isHorizontalOrVertical(line)) {
            mapVent(array, line);
        }
    }

    return getCoordsOfOverlap(array).length;
}

function part2(){
    const max = findMaxValue();
    const array = create2DArray(max);

    for(const line of inputFile) {
            mapVent(array, line);
    }

    return getCoordsOfOverlap(array).length;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);
