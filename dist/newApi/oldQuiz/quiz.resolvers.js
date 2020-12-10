"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

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
    quiz: function () {
      var _quiz2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, args, _ref, info) {
        var _quiz, authUser, userGroup, _userGroup;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _quiz = _ref.models.quiz, authUser = _ref.authUser;

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
                return _quiz.find({
                  adminId: authUser._id
                });

              case 9:
                userGroup = _context.sent;
                return _context.abrupt("return", userGroup);

              case 13:
                _context.next = 15;
                return _quiz.find({
                  adminId: authUser.adminId
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

      function quiz(_x, _x2, _x3, _x4) {
        return _quiz2.apply(this, arguments);
      }

      return quiz;
    }(),
    quizById: function () {
      var _quizById = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref2, info) {
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
                return models.quiz.findById(data._id);

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

      function quizById(_x5, _x6, _x7, _x8) {
        return _quizById.apply(this, arguments);
      }

      return quizById;
    }()
  },
  Mutation: {
    createQuiz: function () {
      var _createQuiz = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref3, info) {
        var _ref3$models, quiz, qbank, authUser, userGroup1, questions, section, createQuiz1;

        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref3$models = _ref3.models, quiz = _ref3$models.quiz, qbank = _ref3$models.qbank, authUser = _ref3.authUser;
                _context3.next = 3;
                return quiz.find({
                  quizName: data.quizName,
                  adminId: authUser._id
                });

              case 3:
                userGroup1 = _context3.sent;

                if (!(userGroup1.length > 0)) {
                  _context3.next = 8;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Quiz already exist');

              case 8:
                questions = [];
                section = []; // for (let cat of data.catWiseQuestions) {
                //     section.push(...[{ sectionName: cat.subject.value, totalQuestion: cat.questionCount }]);
                //     const catWiseQuestions1 = await qbank.find({ adminId: authUser._id, subject: cat.subject.value, level: cat.level.value }).limit(parseInt(cat.questionCount));
                //     for (let catWise of catWiseQuestions1) {
                //         questions.push(...[
                //             catWise._id
                //         ])
                //     }
                // }

                _context3.next = 12;
                return quiz.create({
                  quizName: data.quizName,
                  quizDescription: data.quizDescription,
                  quizDuration: parseFloat(data.quizDuration) * 60,
                  totaQuizDuration: parseFloat(data.quizDuration) * 60,
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
                  adminId: authUser._id // questions: questions,

                });

              case 12:
                createQuiz1 = _context3.sent;
                return _context3.abrupt("return", createQuiz1);

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createQuiz(_x9, _x10, _x11, _x12) {
        return _createQuiz.apply(this, arguments);
      }

      return createQuiz;
    }(),
    updateQuiz: function () {
      var _updateQuiz = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref4, info) {
        var _ref4$models, quiz, qbank, authUser, userGroup1, createQuiz1;

        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _ref4$models = _ref4.models, quiz = _ref4$models.quiz, qbank = _ref4$models.qbank, authUser = _ref4.authUser;
                _context4.next = 3;
                return quiz.find({
                  quizName: data.quizName,
                  adminId: authUser._id
                });

              case 3:
                userGroup1 = _context4.sent;

                if (!(userGroup1.length < 1)) {
                  _context4.next = 8;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Quiz does not exist');

              case 8:
                _context4.next = 10;
                return quiz.update({
                  _id: data._id
                }, {
                  quizName: data.quizName,
                  quizDescription: data.quizDescription,
                  quizDuration: parseFloat(data.quizDuration) * 60,
                  totaQuizDuration: parseFloat(data.quizDuration) * 60,
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
                  adminId: authUser._id // questions: questions,

                });

              case 10:
                createQuiz1 = _context4.sent;
                return _context4.abrupt("return", createQuiz1);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateQuiz(_x13, _x14, _x15, _x16) {
        return _updateQuiz.apply(this, arguments);
      }

      return updateQuiz;
    }(),
    removeQuiz: function () {
      var _removeQuiz = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref5, info) {
        var quiz, authUser, user1, _user;

        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                quiz = _ref5.models.quiz, authUser = _ref5.authUser;
                _context5.next = 3;
                return quiz.find({
                  _id: data._id
                });

              case 3:
                user1 = _context5.sent;

                if (!(user1.length < 0)) {
                  _context5.next = 8;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Found');

              case 8:
                _context5.next = 10;
                return quiz.findByIdAndRemove(data._id);

              case 10:
                _user = _context5.sent;
                return _context5.abrupt("return", _user);

              case 12:
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