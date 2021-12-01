const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt').toString().split('\n').map(m => Number(m));

function part1(input){
  return input.reduce((accumulator, currentValue, currentIndex, array) => {
    let lastValue;
  
    try{
      lastValue = array[currentIndex - 1];
    } finally {
      if(lastValue && currentValue > lastValue) {
        return ++accumulator;
      } else {
        return accumulator;
      }
    }
    
  }, 0)
}

function part2(input) {
  let lastSum = -1;
  let count = 0;
  for (let index = 0; index < input.length; index++) {
    const [one, two, three] = input.slice(index);

    if(!(one && two && three)) break;

    const sum = one + two + three;
    if(sum > lastSum && lastSum !== -1) {
      count++;
    }

    lastSum = sum;
  }
  return count;
}


console.log(`Part 1: ${part1(measurements)}`);
console.log(`Part 2: ${part2(measurements)}`);