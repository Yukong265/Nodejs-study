//이 챕터는 promise.js를 보고 오시길 바랍니다.
//promise가 콜백지옥을 해결했다지만 then과 catch가 계속 반복되어 코드가 장황합니다
// 이떄 사용하는게 async와 await입니다.

function findAndSaveUser(Users){
    Users.findOne({})
        .then((user)=>{
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({ gender : 'm' });
        })
        .then((user)=>{
            console.log('end');
        })
        .catch(err=>{
            console.error(err);
        })
} // 이 코드는 간단한 promise를 사용한 코드입니다. async를 이용해 더 간결하게 만들어보겠습니다.

async function findAndSaveUser(Users){
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender:'m'});
    //위의 코드를 보면 에러를 처리하는 부분, 즉 promise가 reject된 부분이 없으므로 try/catch로 감싸줍니다
    try {
        let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({gender:'m'});
    } catch (err) {
        console.error(err);
    }
} // 코드가 대폭으로 줄었습니다