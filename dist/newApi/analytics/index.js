"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _analytics = _interopRequireDefault(require("./analytics.type"));

var _default = {
  resolvers: require('./analytics.resolver'),
  typeDefs: _analytics.default
};
exports.default = _default;