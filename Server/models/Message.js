const mongoose = require('mongoose');

const MessageSchema= new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  createdAt: { type: Date, default: Date.now }, 
});

module.exports = mongoose.model('Message',MessageSchema);