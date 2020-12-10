"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _util = require("../common/util");

module.exports = {
  Query: {
    quiz: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var quiz, authUser, userGroup, _userGroup;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                quiz = _ref.models.quiz, authUser = _ref.authUser;

                if (!(authUser.role === 'admin')) {
                  _context.next = 8;
                  break;
                }

                _context.next = 4;
                return quiz.find({
                  url: authUser.url
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 4:
                userGroup = _context.sent;
                return _context.abrupt("return", userGroup);

              case 8:
                _context.next = 10;
                return quiz.find({
                  url: authUser.url,
                  userGroupId: authUser.userGroup
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 10:
                _userGroup = _context.sent;
                return _context.abrupt("return", _userGroup);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()),
    quizById: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref3, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models, authUser = _ref3.authUser;
                _context2.next = 3;
                return models.quiz.findById(data.id).lean();

              case 3:
                user1 = _context2.sent;
                return _context2.abrupt("return", user1);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x5, _x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    createQuiz: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
        var quiz, authUser, userGroup1, createQuiz1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                quiz = _ref5.models.quiz, authUser = _ref5.authUser;
                _context3.next = 3;
                return quiz.find({
                  quizName: data.quizName,
                  url: authUser.url
                }).lean();

              case 3:
                userGroup1 = _context3.sent;

                if (!(userGroup1.length > 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Quiz already exist');

              case 6:
                _context3.next = 8;
                return quiz.create({
                  quizName: data.quizName,
                  quizTemplate: data.quizTemplate,
                  quizDescription: data.quizDescription,
                  quizDuration: parseFloat(data.quizDuration),
                  quizAttempt: data.quizAttempt,
                  quizInstruction: data.quizInstruction,
                  quizStartTime: data.quizStartTime,
                  quizEndTime: data.quizEndTime,
                  userGroupId: data.userGroupId,
                  url: authUser.url,
                  qPackId: data.qPackId
                });

              case 8:
                createQuiz1 = _context3.sent;
                return _context3.abrupt("return", createQuiz1);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }()),
    updateQuiz: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var quiz, authUser, userGroup1, createQuiz1;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                quiz = _ref7.models.quiz, authUser = _ref7.authUser;
                _context4.next = 3;
                return quiz.findById(data.id).lean();

              case 3:
                userGroup1 = _context4.sent;

                if (userGroup1) {
                  _context4.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Quiz does not exist');

              case 6:
                _context4.next = 8;
                return quiz.findByIdAndUpdate(data.id, {
                  quizName: data.quizName,
                  quizDescription: data.quizDescription,
                  quizTemplate: data.quizTemplate,
                  quizDuration: parseFloat(data.quizDuration),
                  quizAttempt: data.quizAttempt,
                  quizInstruction: data.quizInstruction,
                  quizStartTime: data.quizStartTime,
                  quizEndTime: data.quizEndTime,
                  userGroupId: data.userGroupId,
                  qPackId: data.qPackId
                }, {
                  new: true
                });

              case 8:
                createQuiz1 = _context4.sent;
                return _context4.abrupt("return", createQuiz1);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x13, _x14, _x15, _x16) {
        return _ref8.apply(this, arguments);
      };
    }()),
    removeQuiz: function () {
      var _removeQuiz = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref9, info) {
        var quiz, authUser, user1, removed;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                quiz = _ref9.models.quiz, authUser = _ref9.authUser;
                _context5.next = 3;
                return quiz.findById(data.id).lean();

              case 3:
                user1 = _context5.sent;

                if (user1) {
                  _context5.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Found');

              case 6:
                _context5.next = 8;
                return quiz.findByIdAndRemove(data.id);

              case 8:
                removed = _context5.sent;
                return _context5.abrupt("return", removed);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function removeQuiz(_x17, _x18, _x19, _x20) {
        return _removeQuiz.apply(this, arguments);
      }

      return removeQuiz;
    }()
  },
  Quiz: {
    id: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(root, args, _ref10, info) {
        var idLoader, authUser, id;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                idLoader = _ref10.loaders.idLoader, authUser = _ref10.authUser;
                _context6.next = 3;
                return idLoader.load(root._id);

              case 3:
                id = _context6.sent;
                return _context6.abrupt("return", id);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function id(_x21, _x22, _x23, _x24) {
        return _id.apply(this, arguments);
      }

      return id;
    }(),
    userGroupDetail: function () {
      var _userGroupDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_, args, _ref11, info) {
        var userGroupDetailLoader, authUser, question;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                userGroupDetailLoader = _ref11.loaders.userGroupDetailLoader, authUser = _ref11.authUser;
                _context7.next = 3;
                return userGroupDetailLoader.load(_.userGroupId);

              case 3:
                question = _context7.sent;
                return _context7.abrupt("return", question);

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function userGroupDetail(_x25, _x26, _x27, _x28) {
        return _userGroupDetail.apply(this, arguments);
      }

      return userGroupDetail;
    }(),
    qPackDetail: function () {
      var _qPackDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_, args, _ref12, info) {
        var qPackDetailLoader, authUser, qPack;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                qPackDetailLoader = _ref12.loaders.qPackDetailLoader, authUser = _ref12.authUser;
                _context8.next = 3;
                return qPackDetailLoader.load(_.qPackId);

              case 3:
                qPack = _context8.sent;
                return _context8.abrupt("return", qPack);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function qPackDetail(_x29, _x30, _x31, _x32) {
        return _qPackDetail.apply(this, arguments);
      }

      return qPackDetail;
    }(),
    resultInfo: function () {
      var _resultInfo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(root, args, _ref13, info) {
        var quizResultLoader, result, authUser, qPack;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                quizResultLoader = _ref13.loaders.quizResultLoader, result = _ref13.models.result, authUser = _ref13.authUser;
                // console.time('qPackLoad Time')
                console.log(authUser._id);
                _context9.next = 4;
                return result.find({
                  quizId: root._id,
                  url: authUser.url
                }).lean();

              case 4:
                qPack = _context9.sent;
                return _context9.abrupt("return", qPack);

              case 6:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function resultInfo(_x33, _x34, _x35, _x36) {
        return _resultInfo.apply(this, arguments);
      }

      return resultInfo;
    }()
  }
}; // export {
//     ApolloError,
//     toApolloError,
//     SyntaxError,
//     ValidationError,
//     AuthenticationError,
//     ForbiddenError,
//     UserInputError,
//     gql
//   } from 'apollo-server-core'