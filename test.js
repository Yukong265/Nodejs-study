const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var result;
function ques() {
    rl.question('Rock Scissors Paper Game!\nYour Answer : ', (answer) => {
        const random = Math.random()
        if (random <= 0.33) {
            result = 'Scissors';
        }
        else if (random <= 0.66) {
            result = 'Paper';
        }
        else {
            result = 'Rock';
        }
        RSP(answer, result);
    })
}
function RSP(answer, result) {
    if (answer === result) {
        console.log('Draw!');
    }
    else if (answer === 'Scissors') {
        if (result === 'Rock') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('Defeat!');
        }
        else if (result === 'Paper') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('Win!');
        }
    }
    else if (answer === 'Rock') {
        if (result === 'Scissors') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('Win!');
        }
        else {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('Defeat!');
        }
    }
    else if (answer === 'Paper') {
        if (result === 'Scissors') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('Defeat!');
        }
        else {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('Win!');
        }
    }
}