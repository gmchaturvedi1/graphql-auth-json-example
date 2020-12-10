"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _qbank = require("./qbank.service");

var _util = require("../common/util");

// import { UserInputError } from 'apollo-server-core'
module.exports = {
  Query: {
    qBank: (0, _util.requiresLogin)(function (_, args, _ref, info) {
      var qbank = _ref.models.qbank,
          authUser = _ref.authUser;
      return (0, _qbank.qBankService)(_, args, {
        models: {
          qbank: qbank
        },
        authUser: authUser
      }, info);
    }),
    qbankById: (0, _util.requiresLogin)(function (_, data, _ref2, info) {
      var models = _ref2.models,
          authUser = _ref2.authUser;
      return (0, _qbank.qbankByIdService)(_, data, {
        models: models,
        authUser: authUser
      }, info);
    })
  },
  Mutation: {
    createQbank: (0, _util.requiresLogin)(function (_, data, _ref3, info) {
      var qbank = _ref3.models.qbank,
          authUser = _ref3.authUser;
      return (0, _qbank.createQbankService)(_, data, {
        models: {
          qbank: qbank
        },
        authUser: authUser
      }, info);
    }),
    updateQbank: (0, _util.requiresLogin)(function (_, data, _ref4, info) {
      var qbank = _ref4.models.qbank,
          authUser = _ref4.authUser;
      return (0, _qbank.updateQbankService)(_, data, {
        models: {
          qbank: qbank
        },
        authUser: authUser
      }, info);
    }),
    removeQbank: (0, _util.requiresLogin)(function (_, data, _ref5, info) {
      var qbank = _ref5.models.qbank,
          authUser = _ref5.authUser;
      return (0, _qbank.removeQbankService)(_, data, {
        models: {
          qbank: qbank
        },
        authUser: authUser
      }, info);
    }),
    uploadQbank: (0, _util.requiresLogin)(function (_, data, _ref6, info) {
      var qbank = _ref6.models.qbank,
          authUser = _ref6.authUser;
      return (0, _qbank.uploadQbankService)(_, data, {
        models: {
          qbank: qbank
        },
        authUser: authUser
      }, info);
    })
  },
  qBank: {
    id: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(root, args, _ref7, info) {
        var idLoader, authUser, id;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                idLoader = _ref7.loaders.idLoader, authUser = _ref7.authUser;
                _context.next = 3;
                return idLoader.load(root._id);

              case 3:
                id = _context.sent;
                return _context.abrupt("return", id);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function id(_x, _x2, _x3, _x4) {
        return _id.apply(this, arguments);
      }

      return id;
    }(),
    subjectDetail: function () {
      var _subjectDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, args, _ref8, info) {
        var subjectDetailLoader, authUser, subjectInfo;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                subjectDetailLoader = _ref8.loaders.subjectDetailLoader, authUser = _ref8.authUser;
                _context2.next = 3;
                return subjectDetailLoader.load(_.subject);

              case 3:
                subjectInfo = _context2.sent;
                return _context2.abrupt("return", subjectInfo);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function subjectDetail(_x5, _x6, _x7, _x8) {
        return _subjectDetail.apply(this, arguments);
      }

      return subjectDetail;
    }(),
    levelDetail: function () {
      var _levelDetail = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, args, _ref9, info) {
        var levelDetailLoader, authUser, levelInfo;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                levelDetailLoader = _ref9.loaders.levelDetailLoader, authUser = _ref9.authUser;
                _context3.next = 3;
                return levelDetailLoader.load(_.level);

              case 3:
                levelInfo = _context3.sent;
                return _context3.abrupt("return", levelInfo);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function levelDetail(_x9, _x10, _x11, _x12) {
        return _levelDetail.apply(this, arguments);
      }

      return levelDetail;
    }()
  }
};