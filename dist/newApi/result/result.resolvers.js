"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _moment = _interopRequireDefault(require("moment"));

var _util = require("../common/util");

module.exports = {
  Query: {
    result: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var result, authUser, userGroup, _userGroup;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                result = _ref.models.result, authUser = _ref.authUser;
                console.log(authUser);

                if (!(authUser.role === 'admin')) {
                  _context.next = 11;
                  break;
                }

                console.log(authUser._id);
                _context.next = 6;
                return result.find({
                  url: authUser.url
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 6:
                userGroup = _context.sent;
                console.log(userGroup.length);
                return _context.abrupt("return", userGroup);

              case 11:
                _context.next = 13;
                return result.find({
                  userId: authUser._id,
                  url: authUser.url
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 13:
                _userGroup = _context.sent;
                return _context.abrupt("return", _userGroup);

              case 15:
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
    resultById: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref3, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models, authUser = _ref3.authUser;
                _context2.next = 3;
                return models.result.findById(data.id).lean();

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
    }()),
    resultsByQuizId: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                models = _ref5.models, authUser = _ref5.authUser;
                _context3.next = 3;
                return models.result.find({
                  quizId: data.id,
                  userId: authUser._id
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 3:
                user1 = _context3.sent;
                return _context3.abrupt("return", user1);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x9, _x10, _x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }())
  },
  Mutation: {
    updateResponse: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var _ref7$models, result, responseBackup, authUser, data1, backup;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref7$models = _ref7.models, result = _ref7$models.result, responseBackup = _ref7$models.responseBackup, authUser = _ref7.authUser;
                _context4.next = 3;
                return result.findByIdAndUpdate(data.quizId, {
                  quizTimeLeft: data.quizDuration,
                  submit: data.submit,
                  response: data.response,
                  lastResponseTime: data.lastResponseTime
                });

              case 3:
                data1 = _context4.sent;
                // eslint-disable-next-line
                backup = responseBackup.create({
                  userId: data.quizId,
                  quizTimeLeft: data.quizDuration,
                  submit: data.submit,
                  response: data.response,
                  lastResponseTime: data.lastResponseTime
                });
                return _context4.abrupt("return", data1);

              case 6:
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
    createExamAttempt: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, args, _ref9, info) {
        var _ref9$models, quiz, result, qPack, authUser, data1, data, date, attemptNumber1, attemptNumber, atNum, qPackDetail, responseData, createExamAttempt;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref9$models = _ref9.models, quiz = _ref9$models.quiz, result = _ref9$models.result, qPack = _ref9$models.qPack, authUser = _ref9.authUser;
                _context5.next = 3;
                return quiz.findById(args.id);

              case 3:
                data1 = _context5.sent;
                data = data1;
                date = (0, _moment.default)(new Date()).format('YYYY-MM-DD HH:mm:ss');

                if (!(0, _moment.default)(date).isBefore(data.quizStartTime)) {
                  _context5.next = 8;
                  break;
                }

                throw new _apolloServerCore.UserInputError("Quiz-".concat(data.quizName, "  is not available.This willbe available after ").concat(data.quizStartTime));

              case 8:
                if (!(0, _moment.default)(date).isAfter(data.quizEndTime)) {
                  _context5.next = 10;
                  break;
                }

                throw new _apolloServerCore.UserInputError("Quiz-".concat(data.quizName, " has been  expired  ").concat(data.quizEndTime));

              case 10:
                _context5.next = 12;
                return result.find({
                  userId: authUser._id,
                  quizId: args.id
                });

              case 12:
                attemptNumber1 = _context5.sent;
                // console.log(attemptNumber1)
                attemptNumber = attemptNumber1.length;
                atNum = parseInt(data.quizAttempt);

                if (!(attemptNumber >= atNum)) {
                  _context5.next = 17;
                  break;
                }

                throw new _apolloServerCore.UserInputError("You have alredy Added this Exam-".concat(data.quizName, " in your myTest Section"));

              case 17:
                _context5.next = 19;
                return qPack.findById(data.qPackId).lean();

              case 19:
                qPackDetail = _context5.sent;
                // console.log(qPackDetail)
                responseData = qPackDetail.questions.map(function (d) {
                  return {
                    qId: d.id,
                    timeTaken: 0,
                    isAnswered: false,
                    selectedOption: '',
                    review: false,
                    visited: false
                  };
                }); //      console.log(responseData)

                _context5.next = 23;
                return result.create({
                  quizName: data.quizName,
                  quizDescription: data.quizDescription,
                  quizDuration: parseFloat(data.quizDuration),
                  quizTimeLeft: parseFloat(data.quizDuration) * 60,
                  lastResponseTime: parseFloat(data.quizDuration) * 60,
                  quizAttempt: data.quizAttempt,
                  quizTemplate: data.quizTemplate,
                  quizInstruction: data.quizInstruction,
                  quizStartTime: data.quizStartTime,
                  quizEndTime: data.quizEndTime,
                  qPackId: data.qPackId,
                  quizId: data._id,
                  url: data.url,
                  userId: authUser._id,
                  response: responseData
                });

              case 23:
                createExamAttempt = _context5.sent;
                return _context5.abrupt("return", createExamAttempt);

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x17, _x18, _x19, _x20) {
        return _ref10.apply(this, arguments);
      };
    }()),
    resultByEmail: function () {
      var _resultByEmail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_, args, _ref11) {
        var user, userFind;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                user = _ref11.models.user;
                _context6.next = 3;
                return user.findOne({
                  email: args.email
                });

              case 3:
                userFind = _context6.sent;
                return _context6.abrupt("return", userFind);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function resultByEmail(_x21, _x22, _x23) {
        return _resultByEmail.apply(this, arguments);
      }

      return resultByEmail;
    }(),
    resetAttempt: function () {
      var _resetAttempt = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_, args, _ref12) {
        var _ref12$models, user, result, userFind, result1, user1;

        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref12$models = _ref12.models, user = _ref12$models.user, result = _ref12$models.result;
                _context7.next = 3;
                return user.findOne({
                  email: args.regNo
                });

              case 3:
                userFind = _context7.sent;
                _context7.next = 6;
                return result.update({
                  userId: userFind._id
                }, {
                  $set: {
                    submit: args.status
                  }
                });

              case 6:
                result1 = _context7.sent;
                _context7.next = 9;
                return user.findOne({
                  email: args.regNo
                });

              case 9:
                user1 = _context7.sent;
                return _context7.abrupt("return", user1);

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function resetAttempt(_x24, _x25, _x26) {
        return _resetAttempt.apply(this, arguments);
      }

      return resetAttempt;
    }(),
    resetDuration: function () {
      var _resetDuration = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_, args, _ref13) {
        var _ref13$models, user, result, userFind, result1, user1;

        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _ref13$models = _ref13.models, user = _ref13$models.user, result = _ref13$models.result;
                _context8.next = 3;
                return user.findOne({
                  email: args.regNo
                });

              case 3:
                userFind = _context8.sent;
                _context8.next = 6;
                return result.update({
                  userId: userFind._id
                }, {
                  $set: {
                    quizTimeLeft: args.quizDuration
                  }
                });

              case 6:
                result1 = _context8.sent;
                _context8.next = 9;
                return user.findOne({
                  email: args.regNo
                });

              case 9:
                user1 = _context8.sent;
                return _context8.abrupt("return", user1);

              case 11:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function resetDuration(_x27, _x28, _x29) {
        return _resetDuration.apply(this, arguments);
      }

      return resetDuration;
    }(),
    resetStream: function () {
      var _resetStream = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(_, args, _ref14) {
        var _ref14$models, user, result, result1, user1;

        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _ref14$models = _ref14.models, user = _ref14$models.user, result = _ref14$models.result;
                _context9.next = 3;
                return user.update({
                  email: args.regNo
                }, {
                  $set: {
                    stream: args.stream
                  }
                });

              case 3:
                result1 = _context9.sent;
                _context9.next = 6;
                return user.findOne({
                  email: args.regNo
                });

              case 6:
                user1 = _context9.sent;
                return _context9.abrupt("return", user1);

              case 8:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function resetStream(_x30, _x31, _x32) {
        return _resetStream.apply(this, arguments);
      }

      return resetStream;
    }()
  },
  Result: {
    id: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(root, args, _ref15, info) {
        var idLoader, authUser, id;
        return _regenerator.default.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                idLoader = _ref15.loaders.idLoader, authUser = _ref15.authUser;
                _context10.next = 3;
                return idLoader.load(root._id);

              case 3:
                id = _context10.sent;
                return _context10.abrupt("return", id);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function id(_x33, _x34, _x35, _x36) {
        return _id.apply(this, arguments);
      }

      return id;
    }(),
    userGroupDetail: function () {
      var _userGroupDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee11(_, args, _ref16, info) {
        var userGroupDetailLoader, authUser, question;
        return _regenerator.default.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                userGroupDetailLoader = _ref16.loaders.userGroupDetailLoader, authUser = _ref16.authUser;
                _context11.next = 3;
                return userGroupDetailLoader.load(_.userGroupId);

              case 3:
                question = _context11.sent;
                return _context11.abrupt("return", question);

              case 5:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function userGroupDetail(_x37, _x38, _x39, _x40) {
        return _userGroupDetail.apply(this, arguments);
      }

      return userGroupDetail;
    }(),
    userDetail: function () {
      var _userDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee12(_, args, _ref17, info) {
        var userDetailLoader, authUser, user;
        return _regenerator.default.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                userDetailLoader = _ref17.loaders.userDetailLoader, authUser = _ref17.authUser;
                _context12.next = 3;
                return userDetailLoader.load(_.userId);

              case 3:
                user = _context12.sent;
                return _context12.abrupt("return", user);

              case 5:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function userDetail(_x41, _x42, _x43, _x44) {
        return _userDetail.apply(this, arguments);
      }

      return userDetail;
    }(),
    qPackDetail: function () {
      var _qPackDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee13(_, args, _ref18, info) {
        var qPackDetailLoader, authUser, qPack;
        return _regenerator.default.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                qPackDetailLoader = _ref18.loaders.qPackDetailLoader, authUser = _ref18.authUser;
                _context13.next = 3;
                return qPackDetailLoader.load(_.qPackId);

              case 3:
                qPack = _context13.sent;
                return _context13.abrupt("return", qPack);

              case 5:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function qPackDetail(_x45, _x46, _x47, _x48) {
        return _qPackDetail.apply(this, arguments);
      }

      return qPackDetail;
    }()
  },
  response: {
    qDetail: function () {
      var _qDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee14(_, args, _ref19, info) {
        var qPackQuestionsLoader, authUser, qPack;
        return _regenerator.default.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                qPackQuestionsLoader = _ref19.loaders.qPackQuestionsLoader, authUser = _ref19.authUser;
                _context14.next = 3;
                return qPackQuestionsLoader.load(_.qId);

              case 3:
                qPack = _context14.sent;
                return _context14.abrupt("return", qPack);

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function qDetail(_x49, _x50, _x51, _x52) {
        return _qDetail.apply(this, arguments);
      }

      return qDetail;
    }()
  }
}; // Result: {
//   response: async (data, args, { models: { qbank }, authUser }, info) => {
//     return data.response
//   }
// },
// response: {
//   questionDetail: async (data, args, { loaders: { questionDetailLoader }, models: { qbank }, authUser }, info) => {
//     return questionDetailLoader.load(data.questionId)
//     // const userGroup = await qbank.findById(data.questionId);
//     // // console.log(userGroup)
//     // return userGroup;
//   }
// }
// reports: async (data, args, { loaders: { questionDetailLoader }, models: { qbank }, authUser }, info) => {
//   const questions = await Promise.all(data.questions.map(key => questionDetailLoader.load(key)))
//   // quizQuestionLoader.loadMany(data.questions)
//   return { question: questions.length }
// }
// export {
//     ApolloError,
//     toApolloError,
//     SyntaxError,
//     ValidationError,
//     AuthenticationError,
//     ForbiddenError,
//     UserInputError,
//     gql
//   } from 'apollo-server-core'