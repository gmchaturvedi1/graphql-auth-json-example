"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// import { UserInputError } from 'apollo-server-core'
// import { requiresLogin } from '../common/util'
module.exports = {
  Query: {
    adminDash: function () {
      var _adminDash = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var _ref$models, quiz, result, user, qPack, qbank, authUser, quiz1, result1, user1, qPack1, qbank1;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$models = _ref.models, quiz = _ref$models.quiz, result = _ref$models.result, user = _ref$models.user, qPack = _ref$models.qPack, qbank = _ref$models.qbank, authUser = _ref.authUser;
                _context.next = 3;
                return quiz.find({
                  url: authUser.url
                }).count().lean();

              case 3:
                quiz1 = _context.sent;
                _context.next = 6;
                return result.find({
                  url: authUser.url
                }).count().lean();

              case 6:
                result1 = _context.sent;
                _context.next = 9;
                return user.find({
                  url: authUser.url,
                  role: 'user'
                }).count().lean();

              case 9:
                user1 = _context.sent;
                _context.next = 12;
                return qPack.find({
                  url: authUser.url
                }).count().lean();

              case 12:
                qPack1 = _context.sent;
                _context.next = 15;
                return qbank.find({
                  url: authUser.url
                }).count().lean();

              case 15:
                qbank1 = _context.sent;
                return _context.abrupt("return", {
                  quizCount: quiz1,
                  resultCount: result1,
                  userCount: user1,
                  qPackCount: qPack1,
                  qbankCount: qbank1
                });

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function adminDash(_x, _x2, _x3, _x4) {
        return _adminDash.apply(this, arguments);
      }

      return adminDash;
    }(),
    userDash: function () {
      var _userDash = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref2, info) {
        var _ref2$models, quiz, result, authUser, quizCount, resultCount, quizCompleted, quizNotCompleted;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2$models = _ref2.models, quiz = _ref2$models.quiz, result = _ref2$models.result, authUser = _ref2.authUser;
                _context2.next = 3;
                return quiz.find({
                  userGroupId: authUser.userGroup
                }).count().lean();

              case 3:
                quizCount = _context2.sent;
                _context2.next = 6;
                return result.find({
                  userId: authUser._id
                }).count().lean();

              case 6:
                resultCount = _context2.sent;
                _context2.next = 9;
                return result.find({
                  userId: authUser._id,
                  submit: true
                }).count().lean();

              case 9:
                quizCompleted = _context2.sent;
                _context2.next = 12;
                return result.find({
                  userId: authUser._id,
                  submit: {
                    $ne: true
                  }
                }).count().lean();

              case 12:
                quizNotCompleted = _context2.sent;
                return _context2.abrupt("return", {
                  quizCount: quizCount,
                  resultCount: resultCount,
                  quizCompleted: quizCompleted,
                  quizNotCompleted: quizNotCompleted
                });

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function userDash(_x5, _x6, _x7, _x8) {
        return _userDash.apply(this, arguments);
      }

      return userDash;
    }()
  }
};