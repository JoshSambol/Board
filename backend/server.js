import dotenv from "dotenv"
import express from "express"
import connectdb from "./config/db.js"
import cors from "cors"
//models import:
import Message from "./Message.js"
import http from "http"
import WebSocket from "ws"
import { WebSocketServer } from "ws"
import { json } from "stream/consumers"
import { type } from "os"
// const espress = require('express')
const app = express()
const port = 3000

const server = http.createServer(app)

const wss = new WebSocketServer({server})

wss.on('connection', (ws) => {
    client.add(ws)
    console.log('Client connected via WebSocket');
  
    ws.on('message', async (data) => {
        const message = JSON.parse(data)

        if (message.type === 'newMessage')

            for(const client of clients) {
                if(client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ type: 'refresh'}))
                }
            }
    //   console.log('Received:', message);
    //   ws.send(`Echo: ${message}`); // Send a response back
    });
  
    ws.on('close', () => {
        clients.delete(ws)
        console.log('Client disconnected');
    });
  });
  
  
  // Regular Express routes
  app.get('/', (req, res) => {
    res.send('Hello from Express');
  });
  
  // Start the serv
dotenv.config()
app.use(cors())
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
    console.log(req.body)
    const {message} = req.body
    console.log(req.body)
    console.log(message)
    const newMessage = new Message({message})
    const response = await newMessage.save()
    console.log(response)
    
    wss.clients.forEach((client) =>{
        if(client.readyState === 1){
            client.send(JSON.stringify({type: 'refresh'}))
        }
    })
    res.status(200).json(response)
    
    } catch(error){
        console.error(error)
        res.status(404).json(error)
    }
})
connectdb()
server.listen(port, () =>{
    console.log(`Listening on http://localhost:${port}`)
})