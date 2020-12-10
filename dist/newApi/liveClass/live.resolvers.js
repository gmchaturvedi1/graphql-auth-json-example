"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _util = require("../common/util");

var config = require('./config');

var debugModule = require('debug');

var mediasoup = require('mediasoup');

module.exports = {
  Query: {
    level: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var level, authUser, levelByAdmin;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                level = _ref.models.level, authUser = _ref.authUser;
                console.time('Level');
                _context.next = 4;
                return level.find({
                  url: authUser.url
                }).sort({
                  createdAt: -1
                }).where('createdAt').lt(data.cursor).limit(10).lean();

              case 4:
                levelByAdmin = _context.sent;
                console.timeEnd('Level');
                return _context.abrupt("return", levelByAdmin);

              case 7:
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
    levelById: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref3, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref3.models, authUser = _ref3.authUser;
                _context2.next = 3;
                return models.level.findById(data.id).lean();

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
    createLevel: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
        var level, authUser, userGroup1, user1;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                level = _ref5.models.level, authUser = _ref5.authUser;
                _context3.next = 3;
                return level.find({
                  levelName: data.levelName,
                  url: authUser.url
                });

              case 3:
                userGroup1 = _context3.sent;

                if (!(userGroup1.length > 0)) {
                  _context3.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('Level already exist');

              case 6:
                _context3.next = 8;
                return level.create({
                  levelName: data.levelName,
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
    updateLevel: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var level, user1, updatedLevel;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                level = _ref7.models.level;
                _context4.next = 3;
                return level.find({
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
                return level.findByIdAndUpdate(data.id, {
                  $set: {
                    levelName: data.levelName
                  }
                });

              case 8:
                updatedLevel = _context4.sent;
                return _context4.abrupt("return", updatedLevel);

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
    removeLevel: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref9, info) {
        var level, authUser, user1, deletedLevel;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                level = _ref9.models.level, authUser = _ref9.authUser;
                _context5.next = 3;
                return level.findById(data.id);

              case 3:
                user1 = _context5.sent;

                if (user1) {
                  _context5.next = 6;
                  break;
                }

                throw new _apolloServerCore.UserInputError('No User Found');

              case 6:
                _context5.next = 8;
                return level.findByIdAndRemove(data.id);

              case 8:
                deletedLevel = _context5.sent;
                return _context5.abrupt("return", deletedLevel);

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
  Level: {
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
  }
};