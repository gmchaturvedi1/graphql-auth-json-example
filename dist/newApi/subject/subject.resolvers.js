"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _util = require("../common/util");

module.exports = {
  Query: {
    subject: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var subject, authUser, userGroup;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                subject = _ref.models.subject, authUser = _ref.authUser;
                _context.next = 3;
                return subject.find({
                  url: authUser.url
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 3:
                userGroup = _context.sent;
                return _context.abrupt("return", userGroup);

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
    subjectById: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref3, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models, authUser = _ref3.authUser;
                _context2.next = 3;
                return models.subject.findById(data.id).lean();

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
    createSubject: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
        var subject, authUser, userGroup1, user1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                subject = _ref5.models.subject, authUser = _ref5.authUser;
                _context3.next = 3;
                return subject.find({
                  subjectName: data.subjectName,
                  url: authUser.url
                });

              case 3:
                userGroup1 = _context3.sent;

                if (!(userGroup1.length > 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Subject already exist');

              case 6:
                _context3.next = 8;
                return subject.create({
                  subjectName: data.subjectName,
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
    updateSubject: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var subject, user1, updatedSubject;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                subject = _ref7.models.subject;
                _context4.next = 3;
                return subject.find({
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
                return subject.findByIdAndUpdate(data.id, {
                  $set: {
                    subjectName: data.subjectName
                  }
                });

              case 8:
                updatedSubject = _context4.sent;
                return _context4.abrupt("return", updatedSubject);

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
    removeSubject: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref9, info) {
        var subject, authUser, user1, removedSubject;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                subject = _ref9.models.subject, authUser = _ref9.authUser;
                _context5.next = 3;
                return subject.findById(data.id);

              case 3:
                user1 = _context5.sent;

                if (user1) {
                  _context5.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Found');

              case 6:
                _context5.next = 8;
                return subject.findByIdAndRemove(data.id);

              case 8:
                removedSubject = _context5.sent;
                return _context5.abrupt("return", removedSubject);

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
    }()),
    subjectByName: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_, data, _ref11, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                models = _ref11.models, authUser = _ref11.authUser;
                _context6.next = 3;
                return models.subject.find({
                  subjectName: {
                    $regex: "".concat(data.name),
                    $options: 'i'
                  }
                }).limit(20).lean();

              case 3:
                user1 = _context6.sent;
                return _context6.abrupt("return", user1);

              case 5:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x21, _x22, _x23, _x24) {
        return _ref12.apply(this, arguments);
      };
    }()),
    subjectWiseQuestion: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_, data, _ref13, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                models = _ref13.models, authUser = _ref13.authUser;
                console.log(data);
                _context7.next = 4;
                return models.qbank.find({
                  subject: data.id
                }).limit(data.count).lean();

              case 4:
                user1 = _context7.sent;
                return _context7.abrupt("return", user1);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x25, _x26, _x27, _x28) {
        return _ref14.apply(this, arguments);
      };
    }())
  },
  Subject: {
    id: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(root, args, _ref15, info) {
        var idLoader, authUser, id;
        return _regenerator.default.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                idLoader = _ref15.loaders.idLoader, authUser = _ref15.authUser;
                _context8.next = 3;
                return idLoader.load(root._id);

              case 3:
                id = _context8.sent;
                return _context8.abrupt("return", id);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function id(_x29, _x30, _x31, _x32) {
        return _id.apply(this, arguments);
      }

      return id;
    }(),
    questionCount: function () {
      var _questionCount = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(root, args, _ref16, info) {
        var models, idLoader, authUser, user1;
        return _regenerator.default.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                models = _ref16.models, idLoader = _ref16.loaders.idLoader, authUser = _ref16.authUser;
                _context9.next = 3;
                return models.qbank.find({
                  subject: root._id
                }).count().lean();

              case 3:
                user1 = _context9.sent;
                return _context9.abrupt("return", user1);

              case 5:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function questionCount(_x33, _x34, _x35, _x36) {
        return _questionCount.apply(this, arguments);
      }

      return questionCount;
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