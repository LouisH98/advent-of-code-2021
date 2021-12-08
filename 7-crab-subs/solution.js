const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt').toString().split(',').map(Number);


function findMaxValue(array){
    let highest = 0;

    array.forEach(val => {
        if(val > highest) highest = val;
    });

    return highest;
}

//returns fuel used to get to position
function moveCrabsTo(crabSubs, position, consistent = true) {
    let fuelUsed = 0;

    crabSubs.forEach(sub => {
        let fuelNeeded;
        if(consistent) {
            fuelNeeded = Math.abs(sub - position);
        } else {
            stepsInbetween = Math.abs(sub - position - 1);
            fuelNeeded = (stepsInbetween * (stepsInbetween + 1)) / 2;

        }
        fuelUsed += fuelNeeded
    })

    return fuelUsed;
}

function part1(){
    let crabs = [...inputFile];

    let leastFuelUsed = Number.MAX_VALUE;

    for (let pos = 0; pos < findMaxValue(crabs); pos++) {
        let fuelUsed = moveCrabsTo(crabs, pos);
        if(fuelUsed < leastFuelUsed) {
            leastFuelUsed = fuelUsed;
        }
    }
    return leastFuelUsed;
}

function part2(){
    let crabs = [...inputFile];

    let leastFuelUsed = Number.MAX_VALUE;

    for (let pos = 0; pos < findMaxValue(crabs); pos++) {
        let fuelUsed = moveCrabsTo(crabs, pos, false);
        if(fuelUsed < leastFuelUsed) {
            leastFuelUsed = fuelUsed;
        }
    }
    return leastFuelUsed;
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);