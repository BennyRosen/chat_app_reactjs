const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ChatApp", {
    autoIndex: true
})

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: {type: String}
})

const roomSchema = new mongoose.Schema({
    members: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [messageSchema]
})

module.exports = mongoose.model('Room', roomSchema)