"use strict";

var mongoose = require('mongoose');

var Float = require('mongoose-float').loadType(mongoose);

var userSchema = new mongoose.Schema({
  url: String,
  qType: String,
  question: String,
  questionDescription: String,
  answers: [{
    label: String,
    point: String
  }],
  questionDirection: String,
  explanation: String,
  subject: String,
  isAnswered: String,
  timeTaken: Number,
  selectedOption: String,
  flag: String,
  visited: String,
  correctAnswer: String,
  level: String,
  mark: Float,
  negativeMark: Float,
  questStatus: String
}, {
  timestamps: true
});
userSchema.index({
  createdAt: -1
});
module.exports = mongoose.model('qBank', userSchema);