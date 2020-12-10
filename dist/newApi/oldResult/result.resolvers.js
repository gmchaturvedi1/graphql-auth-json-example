"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _moment = _interopRequireDefault(require("moment"));

var _domain = require("domain");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var config = {
  secret: 'thisismysecret'
};

var tokenForUser = function tokenForUser(user) {
  //  console.log(user)
  var timeStamp = new Date().getTime(); // return jwt.encode({sub:user.id,iat:timeStamp},config.secret);

  return _jsonwebtoken.default.sign({
    subject: user._id,
    iat: timeStamp,
    expiresIn: '10000 days'
  }, config.secret);
};

module.exports = {
  Query: {
    result: function () {
      var _result2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, args, _ref, info) {
        var _result, authUser, userGroup, _userGroup;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _result = _ref.models.result, authUser = _ref.authUser;

                if (authUser) {
                  _context.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Your are not authenticated');

              case 6:
                if (!(authUser.role === 'admin')) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return _result.find({
                  _id: authUser._id
                });

              case 9:
                userGroup = _context.sent;
                return _context.abrupt("return", userGroup);

              case 13:
                _context.next = 15;
                return _result.find({
                  userId: authUser._id
                });

              case 15:
                _userGroup = _context.sent;
                return _context.abrupt("return", _userGroup);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function result(_x, _x2, _x3, _x4) {
        return _result2.apply(this, arguments);
      }

      return result;
    }(),
    resultById: function () {
      var _resultById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref2, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref2.models, authUser = _ref2.authUser;

                if (authUser) {
                  _context2.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Your are not authenticated');

              case 6:
                _context2.next = 8;
                return models.result.findById(data._id);

              case 8:
                user1 = _context2.sent;
                return _context2.abrupt("return", user1);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function resultById(_x5, _x6, _x7, _x8) {
        return _resultById.apply(this, arguments);
      }

      return resultById;
    }()
  },
  Mutation: {
    updateResponse: function () {
      var _updateResponse = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref3, info) {
        var result, authUser, data1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                result = _ref3.models.result, authUser = _ref3.authUser;
                console.log(data);
                _context3.next = 4;
                return result.findByIdAndUpdate(data.quizId, {
                  quizDuration: data.quizDuration,
                  submit: data.submit,
                  response: data.response
                });

              case 4:
                data1 = _context3.sent;
                return _context3.abrupt("return", data1);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateResponse(_x9, _x10, _x11, _x12) {
        return _updateResponse.apply(this, arguments);
      }

      return updateResponse;
    }(),
    createExamAttempt: function () {
      var _createExamAttempt = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, args, _ref4, info) {
        var _ref4$models, quiz, result, authUser, data1, data, date, attemptNumber1, attemptNumber, atNum, bool, response, _iterator, _step, q, _iterator2, _step2, b, createExamAttempt;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref4$models = _ref4.models, quiz = _ref4$models.quiz, result = _ref4$models.result, authUser = _ref4.authUser;
                _context4.next = 3;
                return quiz.findById(args.id);

              case 3:
                data1 = _context4.sent;
                data = data1;
                date = (0, _moment.default)(new Date()).format('YYYY-MM-DD HH:mm:ss');

                if (!(0, _moment.default)(date).isBefore(data.quizStartTime)) {
                  _context4.next = 8;
                  break;
                }

                throw new _apolloServerCore.UserInputError("Quiz-".concat(data.quizName, "  is not available.This willbe available after ").concat(data.quizStartTime));

              case 8:
                if (!(0, _moment.default)(date).isAfter(data.quizEndTime)) {
                  _context4.next = 10;
                  break;
                }

                throw new _apolloServerCore.UserInputError("Quiz-".concat(data.quizName, " has been  expired  ").concat(data.quizEndTime));

              case 10:
                _context4.next = 12;
                return result.find({
                  userId: authUser._id,
                  quizId: args.id
                });

              case 12:
                attemptNumber1 = _context4.sent;
                attemptNumber = attemptNumber1.length;
                atNum = parseInt(data.maximumAttempt);
                bool = Boolean(attemptNumber > atNum);

                if (!(attemptNumber > atNum)) {
                  _context4.next = 18;
                  break;
                }

                throw new _apolloServerCore.UserInputError("You have alredy Added this Exam-".concat(data.quizName, " in your myTest Section"));

              case 18:
                // const FreeTest = await mongo.adminOrders.find({ adminId: canViewUser.adminId, packName: "Free", testLeft: { $ne: 0 } }).toArray();
                // const PaidOrders = await mongo.adminOrders.find({ adminId: canViewUser.adminId, txnDate: { $ne: null }, testLeft: { $ne: 0 } }).toArray();
                response = [];
                _iterator = _createForOfIteratorHelper(data.catWiseQuestions);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    q = _step.value;
                    _iterator2 = _createForOfIteratorHelper(q.questions);

                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        b = _step2.value;
                        response.push({
                          questionId: b.questionId,
                          questionDetail: b.questionDetail,
                          timeTaken: b.timeTaken,
                          selectedOption: b.selectedOption,
                          review: b.review,
                          visited: b.visited
                        });
                      }
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context4.next = 23;
                return result.create({
                  index: 0,
                  quizName: data.quizName,
                  quizDescription: data.quizDescription,
                  quizDuration: data.quizDuration,
                  totalQuizDuration: data.totalQuizDuration,
                  quizAttempt: data.quizAttempt,
                  quizInstruction: data.quizInstruction,
                  displayResult: data.displayResult,
                  displaySolution: data.displaySolution,
                  displaySection: data.displaySection,
                  displayQuestionOrder: data.displayQuestionOrder,
                  mandatory: data.mandatory,
                  sendEmail: data.sendEmail,
                  sendSms: data.sendSms,
                  examSecurity: data.examSecurity,
                  examView: data.examView,
                  pauseResume: data.pauseResume,
                  navigation: data.navigation,
                  resultType: data.resultType,
                  passPercentage: data.passPercentage,
                  passFeedback: data.passFeedback,
                  failFeedback: data.failFeedback,
                  catWiseQuestions: data.catWiseQuestions,
                  quizStartTime: data.quizStartTime,
                  quizEndTime: data.quizEndTime,
                  userGroup: data.userGroup,
                  sell: data.sell,
                  adminId: data.admnId,
                  userId: authUser._id,
                  quizId: data._id,
                  // questions: data.questions,
                  response: response
                });

              case 23:
                createExamAttempt = _context4.sent;
                return _context4.abrupt("return", createExamAttempt);

              case 25:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createExamAttempt(_x13, _x14, _x15, _x16) {
        return _createExamAttempt.apply(this, arguments);
      }

      return createExamAttempt;
    }()
  },
  Result: {
    response: function () {
      var _response = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(data, args, _ref5, info) {
        var qbank, authUser;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                qbank = _ref5.models.qbank, authUser = _ref5.authUser;
                return _context5.abrupt("return", data.response);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function response(_x17, _x18, _x19, _x20) {
        return _response.apply(this, arguments);
      }

      return response;
    }(),
    quizQuestions: function () {
      var _quizQuestions = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(data, args, _ref6, info) {
        var questionDetailLoader, qbank, authUser, b, questions;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                questionDetailLoader = _ref6.loaders.questionDetailLoader, qbank = _ref6.models.qbank, authUser = _ref6.authUser;

                if (authUser) {
                  _context6.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Your are not authenticated');

              case 6:
                console.log(data.questions);
                b = data.response.map(function (d) {
                  return d.questionId;
                });
                console.log(b);
                _context6.next = 11;
                return Promise.all(b.map(function (key) {
                  return questionDetailLoader.load(key);
                }));

              case 11:
                questions = _context6.sent;
                return _context6.abrupt("return", questions);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function quizQuestions(_x21, _x22, _x23, _x24) {
        return _quizQuestions.apply(this, arguments);
      }

      return quizQuestions;
    }(),
    reports: function () {
      var _reports = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(data, args, _ref7, info) {
        var questionDetailLoader, qbank, authUser, questions;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                questionDetailLoader = _ref7.loaders.questionDetailLoader, qbank = _ref7.models.qbank, authUser = _ref7.authUser;
                _context7.next = 3;
                return Promise.all(data.questions.map(function (key) {
                  return questionDetailLoader.load(key);
                }));

              case 3:
                questions = _context7.sent;
                return _context7.abrupt("return", {
                  question: questions.length
                });

              case 5:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function reports(_x25, _x26, _x27, _x28) {
        return _reports.apply(this, arguments);
      }

      return reports;
    }()
  },
  response: {
    questionDetail: function () {
      var _questionDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(data, args, _ref8, info) {
        var questionDetailLoader, qbank, authUser;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                questionDetailLoader = _ref8.loaders.questionDetailLoader, qbank = _ref8.models.qbank, authUser = _ref8.authUser;
                return _context8.abrupt("return", questionDetailLoader.load(data.questionId));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function questionDetail(_x29, _x30, _x31, _x32) {
        return _questionDetail.apply(this, arguments);
      }

      return questionDetail;
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