"use strict";

var mongoose = require('mongoose');

var qPackSchema = new mongoose.Schema({
  qPackName: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  questions: [{
    id: String,
    positiveMarks: String,
    negativeMarks: String
  }]
}, {
  timestamps: true
});
qPackSchema.index({
  url: 1
});
module.exports = mongoose.model('qPack', qPackSchema);