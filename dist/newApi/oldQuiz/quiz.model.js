"use strict";

var mongoose = require('mongoose');

var Float = require('mongoose-float').loadType(mongoose);

var validateEmail = function validateEmail(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

var userSchema = new mongoose.Schema({
  quizName: String,
  quizDescription: String,
  totalQuizDuration: String,
  quizDuration: String,
  quizAttempt: String,
  quizInstruction: String,
  displayResult: {
    label: String,
    value: String
  },
  displaySolution: {
    label: String,
    value: String
  },
  displaySection: {
    label: String,
    value: String
  },
  displayQuestionOrder: {
    label: String,
    value: String
  },
  mandatory: {
    label: String,
    value: String
  },
  sendEmail: {
    label: String,
    value: String
  },
  sendSms: {
    label: String,
    value: String
  },
  examSecurity: {
    label: String,
    value: String
  },
  examView: {
    label: String,
    value: String
  },
  pauseResume: {
    label: String,
    value: String
  },
  navigation: {
    label: String,
    value: String
  },
  resultType: {
    label: String,
    value: String
  },
  passPercentage: Number,
  passFeedback: String,
  failFeedback: String,
  catWiseQuestions: [{
    level: {
      label: String,
      value: String
    },
    subject: {
      label: String,
      value: String
    },
    mark: String,
    negMark: String,
    questionCount: String,
    questions: [{
      question: String,
      qType: String,
      questionId: String,
      timeTaken: Number,
      selectedOption: String,
      review: String,
      visited: String,
      mark: Number,
      negMark: Number
    }]
  }],
  quizStartTime: String,
  quizEndTime: String,
  userGroup: {
    label: String,
    value: String
  },
  sell: {
    label: String,
    value: String
  },
  adminId: String,
  questions: [{
    questionId: String,
    timeTaken: Number,
    selectedOption: String,
    review: String,
    visited: String,
    mark: String,
    negMark: String
  }]
}, {
  timestamps: true
});
userSchema.index({
  adminId: 1
});
module.exports = mongoose.model('quiz', userSchema);