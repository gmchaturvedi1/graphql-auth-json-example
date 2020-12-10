"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _subject = _interopRequireDefault(require("./subject.type"));

var _default = {
  resolvers: require('./subject.resolvers'),
  typeDefs: _subject.default,
  model: require('./subject.model')
};
exports.default = _default;