const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt').toString().split('\n').map(m => Number(m));

const countOfIncreased = measurements.reduce((accumulator, currentValue, currentIndex, array) => {
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

console.log(`Result is: ${countOfIncreased}`);