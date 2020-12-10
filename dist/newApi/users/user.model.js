"use strict";

var mongoose = require('mongoose');

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var crypto = require('crypto');

var config = {
  secret: 'thisismysecret'
};

var Token = require('./token.model');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    name: 'email',
    index: true
  },
  firstName: {
    type: String,
    required: 'First Name is required',
    max: 100
  },
  lastName: {
    type: String,
    required: 'Last Name is required',
    max: 100
  },
  role: {
    type: String
  },
  adminId: {
    type: String
  },
  userGroup: String,
  mobileNumber: {
    type: String
  },
  url: {
    type: String
  },
  password: {
    type: String,
    required: 'Please enter your Password '
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  },
  image: String
}, {
  timestamps: true
}); // userSchema.pre('save', function (next) {
//   const user = this
//   if (!user.isModified('password')) return next()
//   bcrypt.genSalt(10, function (err, salt) {
//     if (err) return next(err)
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err)
//       user.password = hash
//       next()
//     })
//   })
// })

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  // const today = new Date()
  // const expirationDate = new Date(today)
  // expirationDate.setDate(today.getDate() + 60)
  // const payload = {
  //   subject: this._id,
  //   id: this._id,
  //   email: this.email,
  //   username: this.username,
  //   firstName: this.firstName,
  //   lastName: this.lastName
  // }
  // return jwt.sign(payload, process.env.JWT_SECRET, {
  //   expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
  // })
  var timeStamp = new Date().getTime(); // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);

  return jwt.sign({
    subject: this._id,
    iat: timeStamp,
    expiresIn: '10000 days'
  }, config.secret);
};

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; // expires in an hour
};

userSchema.methods.generateVerificationToken = function () {
  var payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString('hex')
  };
  return new Token(payload);
};

userSchema.post('save', function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('email:email must be unique'));
  } else {
    next(error);
  }
});
userSchema.index({
  url: 1
});
module.exports = mongoose.model('user', userSchema);