const express = require('express');
const app = express();
const PORT = 9000;
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: `http://localhost:8000`,
        methods: ['GET', 'POST'],
        credentials: true
    }
})
const mongoose = require('mongoose');
const cors = require('cors')
const Room = require('./models/Room')
const User = require('./models/User');


mongoose.connect("mongodb://localhost:27017/ChatApp", {
    autoIndex: true
})


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


io.on("connection", (socket) => {
    const sendMessage = async (user, message, chat) => {
        await Room.findOneAndUpdate({_id: chat}, {$push: {messages: {sender: user, content: message}}})
    }
    console.log('user connected')

    socket.on('sendMessage', async({user, message, chat}) => {
        console.log(user + " || " + message + " || " + chat)
        await sendMessage(user, message, chat)
    })
})

app.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    console.log(username, password)
    try {
        const user = await User.findOne({username})
        if(user && password && username && password === user.password) {
            // console.log(user)
            res.json(user);
        } 
    } catch(e) {
        console.log(e);
    }
})

app.get('/register', (req, res, next) => {

})

app.get('/users/:id/chats', async(req, res, next) => {
    console.log('works')
    const {id} = req.params;
    const userChats = await Room.find({members: id})
        .populate({path: 'members', model: 'User'})
        .populate({path: 'messages', model: 'Message'})
    console.log(userChats)
    res.json(userChats)
})
app.get('/users', async(req, res, next) => {
    const users = await User.find({});
    if(users?.length) res.json(users);
    else console.log("No Users")
})

// io.on("connection", () => {
//     console.log('user connected')
    
// })

server.listen(9000, (err) => {
    err ? console.log("err") : console.log(`Express runnning on port - ${PORT}`);
});