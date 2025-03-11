import express from "express"
import connectdb from "./config/db"
// const espress = require('express')
const app = express()
const port = 3000

app.get('/',(req, res) =>{
    res.send('Hello World!')
})
app.get('/messages',(req, res) =>{
    res.send('Message')
})
connectdb()
app.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`)
})
