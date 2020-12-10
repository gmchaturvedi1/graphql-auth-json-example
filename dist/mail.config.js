"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mg = void 0;

var mailgun = require('mailgun-js');

var DOMAIN = 'mail.go4itest.com';
var apiKey = 'a8b6f260432a48d92f99ecf8c48fdff7-074fa10c-8a269550';
var mg = mailgun({
  apiKey: apiKey,
  domain: DOMAIN
});
exports.mg = mg;