//파일 읽기
const fs = require('fs');

fs.readFile('./sample', (err,data)=>{
    if(err){
        throw err;
    }
    console.log(data); //버퍼 출력
    console.log(data.toString()); // 문자 출력
})

//위의 코드를 전에 배웠던 프로미스로 바꾸면

const fs1 = require('fs').promises;

fs1.readFile('./sample')
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
    })
    .catch((err)=>{
        console.error(err);
    })


//파일 만들기
fs1.writeFile('./sample', '1234')
    .then(()=>{
        return fs1.readFile('./sample')
    })
    .then((data)=>{
        console.log(data.toString());
    })
    .catch((err)=>{
        console.error(err);
    })

