const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt')
                        .toString()
                        .replace(/\r/g, "")
                        .split('\n')

const LENGTH_OF_MEASUREMENT = 12;

// gets most often occuring element in array
// if shouldDraw: returns '-' if there is a equal number of 1s and 0s
function mode(array, shouldDraw) {
    const elemMap = {};
    array.forEach(bit => {
        if(!(bit in elemMap)) { 
            elemMap[bit] = 0;
        }

        elemMap[bit]++;
    })

    if(shouldDraw && elemMap['0'] === elemMap['1']) return '-';
    return  Object.keys(elemMap).reduce(function(a, b){ return elemMap[a] > elemMap[b] ? a : b });
}

function notBinString(binString) {
    return binString.split('').map(bit => bit === '1' ? '0': '1').join('');
}

function part1() {
    
    let calculateGamma = () => {
        let gamma = ""; 
        for (let index = 0; index < LENGTH_OF_MEASUREMENT; index++) {
            const filteredArray = measurements.map(elem => elem[index]);
            let mostCommon = mode(filteredArray);
            gamma += mostCommon;
        }

        return gamma;
    }

    const gamma = calculateGamma();
    const epsilon = notBinString(gamma);

    console.log(`Gamma: ${gamma}`);
    console.log(`epsilon: ${epsilon}`);

    return parseInt(gamma, 2) * parseInt(epsilon, 2); 
}

function part2() {

    const getIndexesOfValue = (value, array) => {
        return array.map((elem, index) => {
            if(elem === value) return index;
        }).filter(elem => !isNaN(elem))
    }

    const removeIndexesFromArray = (source, indexes) => {
        return source.filter((_, index) => indexes.includes(index));
    }

    let getRating = () => {
        let filteredMeasurements = [...measurements];
        for (let index = 0; index < LENGTH_OF_MEASUREMENT; index++) {
            const columnList = measurements.map(elem => elem[index]);
            const mostOftenOccuring = mode(columnList);
            const indexesToRemove = getIndexesOfValue(mostOftenOccuring === '1' ? '0' : '1', columnList);
            filteredMeasurements = removeIndexesFromArray(filteredMeasurements, indexesToRemove);
        }
    }

    getRating();
}

console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);