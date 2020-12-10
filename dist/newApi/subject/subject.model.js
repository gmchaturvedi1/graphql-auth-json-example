"use strict";

var mongoose = require('mongoose');

var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

var userSchema = new mongoose.Schema({
  subjectName: {
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
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('subject', userSchema);