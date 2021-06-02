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
                    while (i < filelist.length) {
                        if (ID === filelist[i]) {
                            rl.question('PassWord : ', (answer) => {
                                var PassWord = answer;
                                if (PassWord === data) {
                                    console.log('Login Success!');
                                } else {
                                    console.log('Incorrect Password!')
                                }
                            })
                        } else
                            console.log('Incorrect ID!');
                        i += 1;
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