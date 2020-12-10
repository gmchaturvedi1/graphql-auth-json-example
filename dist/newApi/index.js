"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _graphqlYoga = require("graphql-yoga");

var _users = _interopRequireDefault(require("./users"));

var _qbank = _interopRequireDefault(require("./qbank"));

var _userGroup = _interopRequireDefault(require("./userGroup"));

var _subject = _interopRequireDefault(require("./subject"));

var _level = _interopRequireDefault(require("./level"));

var _quiz = _interopRequireDefault(require("./quiz"));

var _questionPack = _interopRequireDefault(require("./questionPack"));

var _result = _interopRequireDefault(require("./result"));

var _analytics = _interopRequireDefault(require("./analytics"));

var _responseBackupModal = _interopRequireDefault(require("./result/responseBackupModal"));

var _Chat = _interopRequireDefault(require("./Chat"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

// import Auth from '../authenticate'
var loaders = require('./loaders');

var merge = require('lodash/merge');

var pubsub = new _graphqlYoga.PubSub(); // import model from './user/user.model'
// import { crunch } from 'graphql-crunch';
// import url from 'url';
// import querystring from 'querystring';

var context = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(request) {
    var ctx;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            //  console.log(request.request.user)
            // const authUser = await Auth(request.request ? request.request.headers.authorization : null, user.model)
            ctx = _objectSpread(_objectSpread({}, request), {}, {
              models: {
                message: _Chat.default.model,
                user: _users.default.model,
                qbank: _qbank.default.model,
                userGroup: _userGroup.default.model,
                subject: _subject.default.model,
                level: _level.default.model,
                quiz: _quiz.default.model,
                qPack: _questionPack.default.model,
                result: _result.default.model,
                responseBackup: _responseBackupModal.default
              },
              loaders: loaders(),
              authUser: request.request.user,
              // authUser: authUser,
              pubsub: pubsub,
              withFilter: _graphqlYoga.withFilter
            }); // const qs = querystring.parse(request.url);
            // if (process.env.NODE_ENV === 'development' && request.headers['x-timestamp']) {
            //   ctx.timestamp = moment(request.headers['x-timestamp']);
            // }

            return _context.abrupt("return", ctx);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function context(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  typeDefs: [_users.default.typeDefs, _qbank.default.typeDefs, _userGroup.default.typeDefs, _subject.default.typeDefs, _Chat.default.typeDefs, _level.default.typeDefs, _quiz.default.typeDefs, _questionPack.default.typeDefs, _result.default.typeDefs, _analytics.default.typeDefs].join(' '),
  resolvers: merge({}, _users.default.resolvers, _qbank.default.resolvers, _userGroup.default.resolvers, _subject.default.resolvers, _Chat.default.resolvers, _level.default.resolvers, _quiz.default.resolvers, _questionPack.default.resolvers, _result.default.resolvers, _analytics.default.resolvers),
  context: context
};