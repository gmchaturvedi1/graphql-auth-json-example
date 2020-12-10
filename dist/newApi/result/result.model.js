"use strict";

var mongoose = require('mongoose'); // var Float = require('mongoose-float').loadType(mongoose)
// var validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//   return re.test(email)
// }


var userSchema = new mongoose.Schema({
  quizTemplate: String,
  quizName: String,
  quizDescription: String,
  quizDuration: String,
  quizTimeLeft: Number,
  quizAttempt: String,
  quizInstruction: String,
  quizStartTime: String,
  quizEndTime: String,
  userGroupId: String,
  url: String,
  qPackId: String,
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
  url: 1,
  userId: 1
});
module.exports = mongoose.model('result', userSchema);