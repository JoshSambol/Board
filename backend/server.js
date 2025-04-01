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
app.get('/messages', async (req, res) =>{
    try {
    const messages = await Message.find({})
    res.status(200).json(messages)
    } catch(error){
        console.error(error)
        res.status(404).json(error)
    }
})
app.post('/messages', async (req,res) =>{
    try {
    const {message} = req.body
    console.log(message)
    const newMessage = new Message({message})
    const response = await newMessage.save()
    console.log(response)
    res.status(200).json(response)
    
    } catch(error){
        console.error(error)
        res.status(404).json(error)
    }
})
connectdb()
app.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`)
})
