const express = require('express');

const app = express();

const send_message = require('./controllers/send_message');

app.use(express.json())

let a = 0;

app.get('/sms/:phone', (req,res)=>{
    const paramObj = req.params;
    verifyCode = send_message(paramObj.phone);
    a = Number(verifyCode);
    res.status(200).json({
        code:200,
        verifyCode: verifyCode,
        message: "SMS send to phone number!"
    })
})

app.post('/sms', (req,res)=>{
    verifyCode = req.body.verifyCode;
    console.log(verifyCode)
    if (verifyCode != a) {
        res.status(401).json({
            code:401,
            message:"Unauthentication"
        })
    } else {
        res.status(200).json({
            code:200,
            message:"success to authentication"
        })
    }
    
})


app.listen(3000, (req, res)=>{
    console.log('server listening on port 3000!')
})