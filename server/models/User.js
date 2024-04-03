const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/ChatApp", {
    autoIndex: true
})

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: false
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User;