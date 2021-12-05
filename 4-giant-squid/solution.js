const fs = require('fs');
let inputFile = fs.readFileSync('./input.txt').toString().split(/\r\n\r/g);

const bingoNumbers = inputFile[0].split(',').map(Number);

class BingoCard {
    board =  Array(5).fill(null).map(x => Array(5).fill(null));
    hasWonAlready = false;
    id = Math.random()
    constructor(boardString) {
        //parse input 
        let boardRows = boardString.replace(/\n/g, '').split("\r");
        for (let i = 0; i < boardRows.length; i++) {
            const cols = boardRows[i].split(' ').filter(val => val.length > 0);
            for (let j = 0; j < cols.length; j++) {
                this.board[i][j] = {val: parseInt(cols[j]), marked: false}
            }
        }
    }

    draw(value) {
        this.board.forEach(row => {
            row.forEach(element => {
                if(element.val === value) element.marked = true;
            })
        })
        return this.hasWon();
    }

    getUnmarkedNumbers(){
        const numbers = [];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const value = this.board[i][j];
                if(!value.marked) numbers.push(value.val);
            }
        }
        return numbers;
    }

    hasWon(){
        for (let i = 0; i < this.board.length; i++) {
            const row = this.board[i];
            let scoreHorizontal = 0;
            let scoreVertical = 0;
        
            for (let j = 0; j < row.length; j++) {
                const valueA = this.board[i][j];
                const valueB = this.board[j][i];
                if(valueA.marked) scoreHorizontal++;
                if(valueB.marked) scoreVertical++;
            }

            if(scoreHorizontal === row.length || scoreVertical === row.length) {
                this.hasWonAlready = true;
                return {won: true, sum: this.getUnmarkedNumbers().reduce((accumulator, val) => accumulator + val, 0)};
            } else {
                return {won: false};
            }
        }
    }
}

const getCards = () => {
    const cards = [];

    inputFile.slice(1).forEach(card => {
        cards.push(new BingoCard(card));
    });

    return cards;
};

function part1(){
    const cards = getCards();

    for(const number of bingoNumbers) {
        for(const card of cards) {
            const cardStatus = card.draw(number);

            if(cardStatus.won) {
                console.log(`Won! ${cardStatus.sum}`)
                return cardStatus.sum * number;
            }
        }
    }
}

function part2(){
    const cards = getCards();
    let winners = [];
    for(let i = 0; i < bingoNumbers.length; i++) {
        const number = bingoNumbers[i];
        for(let j = 0; j < cards.length; j++) {
            const card = cards[j];
            const winStatus = card.draw(number);
            if(winStatus.won && !winners.includes(card)){
                winners.push(card);
            }

            if(winners.length === boards.length) {
                return winStatus.sum * number
            }
        }
    }
    return winSum * lastNumberToWin;
}
console.log(`Part 1: ${part1()}`);
console.log(`Part 2: ${part2()}`);