"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _qPack = _interopRequireDefault(require("./qPack.type"));

var _default = {
  resolvers: require('./qPack.resolvers'),
  typeDefs: _qPack.default,
  model: require('./qPack.model')
};
exports.default = _default;