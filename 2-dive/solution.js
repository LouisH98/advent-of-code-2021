const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt').toString().split('\n');

const part1 = () => {
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

    return subPosition['horizontal'] * subPosition['depth']
}


console.log(`Part 1: ${part1()}`);