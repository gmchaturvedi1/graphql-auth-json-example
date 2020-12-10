"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _userGroup = _interopRequireDefault(require("./userGroup.type"));

var _default = {
  resolvers: require('./userGroup.resolvers'),
  typeDefs: _userGroup.default,
  model: require('./userGroup.model')
};
exports.default = _default;