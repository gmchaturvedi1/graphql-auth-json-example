"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _level = _interopRequireDefault(require("./level.type"));

var _default = {
  resolvers: require('./level.resolvers'),
  typeDefs: _level.default,
  model: require('./level.model')
};
exports.default = _default;