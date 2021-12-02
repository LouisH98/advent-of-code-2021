const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt')
                        .toString()
                        .split('\n')
                        .map(line => line.replace("\r", ""))
                        .map(line => line.split(" "))
                        .map(line => [line[0], Number(line[1])])


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
        let [direction, amount] = measurement;
    
        [direction, amount] = mapMeasurement(direction, amount)
        subPosition[direction] += amount
    }

    return subPosition['horizontal'] * subPosition['depth']
}


const part2 = () => {
    const subPosition = {
        horizontal: 0,
        aim: 0, 
        depth: 0
    }

    for(const measurement of measurements) {
        let [direction, amount] = measurement;

        if(direction === "down" || direction === "up") {
            subPosition['aim'] += (direction === 'up' ? -amount : amount);
        } else {
            // instruction is forward
            subPosition['horizontal'] += amount;
            subPosition['depth']  += subPosition['aim'] * amount;
        }
    }

    return subPosition['horizontal'] * subPosition['depth'];
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);