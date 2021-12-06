const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt')
                    .toString()
                    .split(",")
                    .map(Number);

function doDaysIterationOnFish(numDays) {
    // 10 day window of 'breeders'
    let days = Array(9).fill(0);
    let fishes = [...inputFile];

    fishes.forEach(fish => {
        days[fish] += 1;
    });

    for (let i = 0; i < numDays; i++) {
        let today = i % days.length;
        days[(today + 7) % days.length] += days[today];
    }

    return days.reduce((acc, v) => acc+v);
} 

console.log(`Part 1: ${doDaysIterationOnFish(80)}`);
console.log(`Part 1: ${doDaysIterationOnFish(256)}`);