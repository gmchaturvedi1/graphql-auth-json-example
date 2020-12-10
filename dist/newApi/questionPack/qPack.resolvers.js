"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _util = require("../common/util");

module.exports = {
  Query: {
    qPack: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var qPack, authUser, questionPack;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                qPack = _ref.models.qPack, authUser = _ref.authUser;
                _context.next = 3;
                return qPack.find({
                  url: authUser.url
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 3:
                questionPack = _context.sent;
                return _context.abrupt("return", questionPack);

              case 5:
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
    qPackById: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref3, info) {
        var models, authUser, questionPack;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models, authUser = _ref3.authUser;
                _context2.next = 3;
                return models.qPack.findById(data.id).lean();

              case 3:
                questionPack = _context2.sent;
                return _context2.abrupt("return", questionPack);

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
    createQPack: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
        var qPack, authUser, userGroup1, user1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                qPack = _ref5.models.qPack, authUser = _ref5.authUser;
                _context3.next = 3;
                return qPack.find({
                  qPackName: data.qPackName,
                  url: authUser.url
                });

              case 3:
                userGroup1 = _context3.sent;

                if (!(userGroup1.length > 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('QPack already exist');

              case 6:
                _context3.next = 8;
                return qPack.create({
                  qPackName: data.qPackName,
                  questions: data.questions,
                  url: authUser.url
                });

              case 8:
                user1 = _context3.sent;
                return _context3.abrupt("return", user1);

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
    updateQPack: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var qPack, user1, updated;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                qPack = _ref7.models.qPack;
                _context4.next = 3;
                return qPack.find({
                  _id: data.id
                });

              case 3:
                user1 = _context4.sent;

                if (user1) {
                  _context4.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Group  Found');

              case 6:
                _context4.next = 8;
                return qPack.findByIdAndUpdate(data.id, {
                  $set: {
                    qPackName: data.qPackName,
                    questions: data.questions
                  }
                });

              case 8:
                updated = _context4.sent;
                return _context4.abrupt("return", updated);

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
    removeQPack: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref9, info) {
        var qPack, authUser, user1, removed;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                qPack = _ref9.models.qPack, authUser = _ref9.authUser;
                _context5.next = 3;
                return qPack.findById(data.id);

              case 3:
                user1 = _context5.sent;

                if (user1) {
                  _context5.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Found');

              case 6:
                _context5.next = 8;
                return qPack.findByIdAndRemove(data.id);

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

      return function (_x17, _x18, _x19, _x20) {
        return _ref10.apply(this, arguments);
      };
    }())
  },
  QuestionPack: {
    id: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(root, args, _ref11, info) {
        var idLoader, authUser, id;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                idLoader = _ref11.loaders.idLoader, authUser = _ref11.authUser;
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
    }()
  },
  questionOfPack: {
    questionDetail: function () {
      var _questionDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_, args, _ref12, info) {
        var qPackQuestionsLoader, authUser, question;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                qPackQuestionsLoader = _ref12.loaders.qPackQuestionsLoader, authUser = _ref12.authUser;
                _context7.next = 3;
                return qPackQuestionsLoader.load(_.id);

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

      function questionDetail(_x25, _x26, _x27, _x28) {
        return _questionDetail.apply(this, arguments);
      }

      return questionDetail;
    }()
  }
};