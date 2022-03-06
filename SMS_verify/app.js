const express = require('express');

const app = express();

const send_message = require('./controllers/send_message')

app.get('/sms/:phone', (req,res)=>{
    const paramObj = req.params;
    send_message(paramObj.phone);
    res.send("complete!")
})

app.listen(3000, (req, res)=>{
    console.log('server listening on port 3000!')
})