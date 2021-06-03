const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

var Rps = function () {
    
};

var i = 0;
rl.question('Login : 1, Register : 2 \n', (answer) => {
    if (answer === '1') {
        rl.question('ID : ', (answer) => {
            fs.readdir('./data/', function (err, filelist) {
                fs.readFile(`data/${answer}`, 'utf-8', function (err, data) {
                    var ID = answer;
                    var findingFile
                    while (i < filelist.length) {
                        if (ID === filelist[i]) {
                            findingFile = filelist[i]
                        }
                        i += 1;
                    }
                    if (findingFile === undefined) {
                        console.log('Incorrect ID!');
                    } else {
                        rl.question('PassWord : ', (answer) => {
                            var PassWord = answer;
                            if (PassWord === data) {
                                console.log('Login Success!');
                                ques();
                            } else {
                                console.log('Incorrect Password!');
                            }
                        })
                    }
                })
            })
        })
    } else if (answer == '2') {
        rl.question('Register\nID : ', (answer) => {
            var ID = answer;
            rl.question('PassWord : ', (answer) => {
                var PassWord = answer;
                fs.writeFile(`data/${ID}`, PassWord, function (err) {
                    console.log('Register Success!');
                })
            })
        });
    }
})

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
        RSP(answer, result);
    }
    else if (answer === 'Scissors') {
        if (result === 'Rock') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('You Defeat!');
        }
        else if (result === 'Paper') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('You Win!');
        }
    }
    else if (answer === 'Rock') {
        if (result === 'Scissors') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('You Win!');
        }
        else {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('You Defeat!');
        }
    }
    else if (answer === 'Paper') {
        if (result === 'Scissors') {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('You Defeat!');
        }
        else {
            console.log('Your answer : ' + answer);
            console.log("Computer's answer : " + result);
            console.log('You Win!');
        }
    }
}