"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _result = _interopRequireDefault(require("./result.type"));

var _default = {
  resolvers: require('./result.resolvers'),
  typeDefs: _result.default,
  model: require('./result.model')
};
exports.default = _default;