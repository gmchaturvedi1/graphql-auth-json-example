"use strict";

var mongoose = require('mongoose'); // var Float = require('mongoose-float').loadType(mongoose)
// var validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//   return re.test(email)
// }


var userSchema = new mongoose.Schema({
  quizTimeLeft: Number,
  userId: String,
  quizId: String,
  lastResponseTime: Number,
  submit: Boolean,
  response: [{
    qId: String,
    timeTaken: Number,
    isAnswered: Boolean,
    selectedOption: String,
    review: Boolean,
    visited: Boolean
  }]
}, {
  timestamps: true
});
userSchema.index({
  userId: 1
});
module.exports = mongoose.model('responseBackup', userSchema);