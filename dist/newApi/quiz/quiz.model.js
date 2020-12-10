"use strict";

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  quizName: String,
  quizDescription: String,
  quizDuration: String,
  quizAttempt: String,
  quizInstruction: String,
  quizStartTime: String,
  quizEndTime: String,
  userGroupId: String,
  url: String,
  quizTemplate: String,
  qPackId: String
}, {
  timestamps: true
});
userSchema.index({
  url: 1
});
module.exports = mongoose.model('quiz', userSchema);