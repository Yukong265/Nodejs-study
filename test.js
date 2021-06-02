const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var i=0;
fs.readdir('./data', function(err, filelist){
    while(i<filelist.length){
        console.log(filelist[i]);
        i += 1;
        
    }
})