const Room = require("../models/Room");
const mongoose = require('mongoose')
const User = require('../models/User')

mongoose.connect("mongodb://localhost:27017/ChatApp", {
    autoIndex: true
})

const seedRooms = async() => {
    const user1 = await User.findById("651f9633077d30a601fc2f82")
    const user2 = await User.findById("651f9633077d30a601fc2f83")
    await Room.insertMany([
        {members: [user1, user2], messages: [{sender: user1, content: "hello form user 1"}, {sender: user2, content: "hello form user 2"}]},
        {members: [user1, user2], messages: [{sender: user1, content: "hello form user 1"}]},
    ])
}

seedRooms();