const express = require('express')
app = express()


const PORT = 5000;

app.set("port", PORT);

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(PORT, (req,res)=>{
    console.log(`server is running on port ${PORT}`)
})

module.exports = app;