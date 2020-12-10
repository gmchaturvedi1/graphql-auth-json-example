"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  roomName: {
    type: String
  }
}, {
  timestamps: true
});
userSchema.index({
  url: 1
});
module.exports = mongoose.model('level', userSchema);