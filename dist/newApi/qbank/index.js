"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _qbank = _interopRequireDefault(require("./qbank.type"));

var _default = {
  resolvers: require('./qbank.resolvers'),
  typeDefs: _qbank.default,
  model: require('./qbank.model')
};
exports.default = _default;