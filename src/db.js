const mongoose = require('mongoose')
const Logger = mongoose.mongo.Logger
// const assert = require('assert')

const uri = process.env.NODE_ENV === "development" ? 'mongodb://localhost:27017/testServer' : "mongodb+srv://gmchaturvedi:@cluster0.apbsq.mongodb.net/testServer?retryWrites=true&w=majority"

const connectToDB = (url = uri) => {
  let logCount = 0
  Logger.setCurrentLogger((msg, state) => {
    console.log(`MONGO DB REQUEST ${++logCount}`)
    // console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`)
  })
  Logger.setLevel('debug')
  Logger.filter('class', ['Cursor'])
  console.log('Connected successfully to server')
  return mongoose.connect(url, {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 50,
    bufferMaxEntries: 0,
    keepAlive: 120,
    useNewUrlParser: true
  })
}

module.exports = connectToDB
