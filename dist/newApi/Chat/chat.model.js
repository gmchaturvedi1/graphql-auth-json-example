"use strict";

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
  message: String,
  senderMail: String,
  receiverMail: String,
  timestamp: Number
}, {
  timestamps: true
}); //userSchema.index({ url: 1 })

module.exports = mongoose.model('message', messageSchema);