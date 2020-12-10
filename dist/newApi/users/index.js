"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _user = _interopRequireDefault(require("./user.type"));

// import type from './user.type'
var _default = {
  resolvers: require('./user.resolvers'),
  typeDefs: _user.default,
  model: require('./user.model')
};
exports.default = _default;