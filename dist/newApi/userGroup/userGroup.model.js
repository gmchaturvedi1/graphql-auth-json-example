"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userGroupName: {
    type: String,
    required: true
  },
  url: {
    type: String
  }
}, {
  timestamps: true
});
userSchema.index({
  adminId: 1
});
module.exports = mongoose.model('userGroup', userSchema);