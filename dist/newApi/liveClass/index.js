"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _live = _interopRequireDefault(require("./live.type"));

var _default = {
  resolvers: require('./live.resolvers'),
  typeDefs: _live.default,
  model: require('./live.model')
};
exports.default = _default;