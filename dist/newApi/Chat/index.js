"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chat = _interopRequireDefault(require("./chat.type"));

var _default = {
  resolvers: require('./chat.resolvers'),
  typeDefs: _chat.default,
  model: require('./chat.model')
};
exports.default = _default;