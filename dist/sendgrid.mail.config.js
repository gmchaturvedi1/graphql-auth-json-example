"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var sgMail = require('@sendgrid/mail');

var SENDGRID_API_KEY = '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';
sgMail.setApiKey(SENDGRID_API_KEY);
var _default = sgMail;
exports.default = _default;