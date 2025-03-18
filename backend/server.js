import dotenv from "dotenv"
import express from "express"
import connectdb from "./config/db.js"

//models import:
import Message from "./Message.js"
// const espress = require('express')
const app = express()
const port = 3000

dotenv.config()

//body parser
app.use(express.json())

app.get('/',(req, res) =>{
    res.send('Hello World!')
})
app.get('/messages',(req, res) =>{
    res.send('Message')
})
app.post('/messages',(req,res) =>{
    req.body()
    
})
connectdb()
app.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`)
})
