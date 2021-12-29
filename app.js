const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const { sequelize } = require('./models');
const passport = require('passport');

const ItemRouter = require('./routes/item');
const UserRouter = require('./routes/user');
const passportConfig = require('./passport');

dotenv.config();
passportConfig();
const app = express();
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cookieParser(process.env.COOKIESECRET))
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIESECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
    name: 'session-cookie',
}))

sequelize.sync({force:false})
    .then(()=>{
        console.log("success to connect database!");
    })
    .catch((err)=>{
        console.log(err);
    })


app.use(passport.initialize());
app.use(passport.session());


app.use('/user', UserRouter);
app.use('/list', ItemRouter);



app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error);
})

app.use((err, req,res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.send('error');
})

app.get('/', (req,res)=>{
    res.json({
        message:'nice'
    })
})


app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중');
})