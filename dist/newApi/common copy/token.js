"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tokenForUser = void 0;

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var config = {
  secret: 'thisismysecret'
};

var tokenForUser = function tokenForUser(user) {
  var timeStamp = new Date().getTime(); // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);

  return _jsonwebtoken.default.sign({
    subject: user._id,
    iat: timeStamp,
    expiresIn: '10000 days'
  }, config.secret);
};

exports.tokenForUser = tokenForUser;