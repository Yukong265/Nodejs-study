const a = false;

const promise = new Promise((resolve, reject)=>{
    if (a){
        resolve('true');
    } else {
        reject('false');
    }
});

promise
    .then((message)=>{
        console.log(message) // 성공(resolve) 시 실행
    })
    .catch((error)=>{
        console.error(error) // 실패(reject)시 실행
    })
    .finally(()=>{
        console.log('무조건') // 끝나고 무조건 실행
    })

function findAndSaveUser(Users){
    Users.findOne({}, (err, user)=>{ // 첫번째 콜백
        if (err){
            return console.error(err)
        }
        user.name = 'zero';
        user.save((err)=>{ // 두번째 콜백
            if(err){
                return console.error(err);
            }
            Users.findOne({gender: 'm'}, (err, user)=>{ // 세번째 콜백
                console.log('end')
            })
        })
    })
} 
// 위의 코드를 promise로 바꿀 수 있다.

function findAndSaveUserPromise(Users){
    Users.findOne({})
        .then((user)=>{
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({gender:'m'})
        })
        .then((user)=>{
            console.log('end')
        })
        .catch(err=>{
            console.error(err)
        })
}
// 코드가 훨씬 간결해졌다, 또한 순차적으로 실행되는데
// 이것을 Promise.all로 한번에 실행 시킬 수 있다

const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.error(error);
    })
// result = ['성공1', '성공2']