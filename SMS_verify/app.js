const express = require('express');

const app = express();

const send_message = require('./controllers/send_message')

app.get('/sms/:phone', (req,res)=>{
    const paramObj = req.params;
    verifyCode = send_message(paramObj.phone);
    res.status(200).json({
        code:200,
        verifyCode: verifyCode,
        message: "SMS send to phone number!"
    })
})

app.listen(3000, (req, res)=>{
    console.log('server listening on port 3000!')
})