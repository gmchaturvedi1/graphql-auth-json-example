"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _quiz = _interopRequireDefault(require("./quiz.type"));

var _default = {
  resolvers: require('./quiz.resolvers'),
  typeDefs: _quiz.default,
  model: require('./quiz.model')
};
exports.default = _default;