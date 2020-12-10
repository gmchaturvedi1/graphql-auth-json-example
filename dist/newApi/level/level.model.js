"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  levelName: {
    type: String
  },
  url: {
    type: String
  }
}, {
  timestamps: true
});
userSchema.index({
  url: 1
});
module.exports = mongoose.model('level', userSchema);