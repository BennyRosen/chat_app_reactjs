const mongoose = require('mongoose')
const User = require('../models/User')
mongoose.connect("mongodb://localhost:27017/ChatApp", {
    autoIndex: true
})

const createUsers = async () => {
    await User.insertMany([
        {username: "1", password: "123"},
        {username: "2", password: "1234"},
        {username: "3", password: "1234"},
        {username: "4", password: "1234"},
    ])
}

createUsers();