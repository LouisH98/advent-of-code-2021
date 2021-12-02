const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt').toString().split('\n');

const subPosition = {
    horizontal: 0,
    depth: 0
}

let mapMeasurement = (direction, amount) => {
    let directionMap =  {
        up: 'depth',
        down: 'depth',
        forward: 'horizontal',
    }

    if(direction === 'up') {
        amount = -amount
    }

    return [directionMap[direction], amount]
  
}

for(const measurement of measurements) {
    let [direction, amount] = measurement.replace("\r", "").split(" ");
    amount = Number(amount);

    [direction, amount] = mapMeasurement(direction, amount)
    subPosition[direction] += amount
}

console.log(subPosition['horizontal'] * subPosition['depth']);