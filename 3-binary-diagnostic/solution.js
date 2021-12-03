const fs = require('fs')
let measurements = fs.readFileSync('./measurements.txt')
                        .toString()
                        .replace(/\r/g, "")
                        .split('\n')

//gets most often occuring element in array
function mode(array) {
    con
}

function notBinString(binString) {
    return binString.split('').map(bit => bit === '1' ? '0': '1').join('');
}

function part1() {
    const LENGTH_OF_MEASUREMENT = 12;
    
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

console.log(`Part 1: ${part1()}`);