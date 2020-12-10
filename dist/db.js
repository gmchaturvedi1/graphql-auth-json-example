"use strict";

var mongoose = require('mongoose');

var Logger = mongoose.mongo.Logger; // const assert = require('assert')

var uri = process.env.NODE_ENV === "development" ? 'mongodb://localhost:27017/go4itest' : "mongodb+srv://gmchaturvedi:U6Il71Cw7XWzA0N3@cluster0.apbsq.mongodb.net/go4itest?retryWrites=true&w=majority";

var connectToDB = function connectToDB() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : uri;
  var logCount = 0;
  Logger.setCurrentLogger(function (msg, state) {
    console.log("MONGO DB REQUEST ".concat(++logCount)); // console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`)
  });
  Logger.setLevel('debug');
  Logger.filter('class', ['Cursor']);
  console.log('Connected successfully to server');
  return mongoose.connect(url, {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true
  });
};

module.exports = connectToDB;