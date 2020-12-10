"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _util = require("../common/util");

module.exports = {
  Query: {
    userGroup: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var models, authUser, userGroup;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref.models, authUser = _ref.authUser;
                _context.next = 3;
                return models.userGroup.find({
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
    userGroupById: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref3, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models, authUser = _ref3.authUser;
                _context2.next = 3;
                return models.userGroup.findById(data.id).lean();

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
    createUserGroup: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
        var userGroup, authUser, userGroup1, user1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userGroup = _ref5.models.userGroup, authUser = _ref5.authUser;
                _context3.next = 3;
                return userGroup.find({
                  userGroupName: data.userGroupName,
                  url: authUser.url
                }).lean();

              case 3:
                userGroup1 = _context3.sent;

                if (!(userGroup1.length > 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('UserGroup already exist');

              case 6:
                _context3.next = 8;
                return userGroup.create({
                  userGroupName: data.userGroupName,
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
    updateUserGroup: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var userGroup, user1, updatedGroup;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userGroup = _ref7.models.userGroup;
                _context4.next = 3;
                return userGroup.findById(data.id).lean();

              case 3:
                user1 = _context4.sent;

                if (user1) {
                  _context4.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Group  Found');

              case 6:
                _context4.next = 8;
                return userGroup.findByIdAndUpdate(data.id, {
                  $set: {
                    userGroupName: data.userGroupName
                  }
                });

              case 8:
                updatedGroup = _context4.sent;
                return _context4.abrupt("return", updatedGroup);

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
    removeUserGroup: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref9, info) {
        var userGroup, authUser, user1, removedGroup;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userGroup = _ref9.models.userGroup, authUser = _ref9.authUser;
                console.log(data.id);
                _context5.next = 4;
                return userGroup.findById(data.id).lean();

              case 4:
                user1 = _context5.sent;

                if (user1) {
                  _context5.next = 7;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Group Found');

              case 7:
                _context5.next = 9;
                return userGroup.findByIdAndRemove(data.id);

              case 9:
                removedGroup = _context5.sent;
                return _context5.abrupt("return", removedGroup);

              case 11:
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
  userGroup: {
    id: function id(parent) {
      return parent._id.toString();
    }
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