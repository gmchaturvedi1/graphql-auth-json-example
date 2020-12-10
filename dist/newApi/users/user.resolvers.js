"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userServices = require("./services/user.services.js");

var _util = require("../common/util");

module.exports = {
  Query: {
    user: function user(_, args, _ref, info) {
      var _user = _ref.models.user,
          authUser = _ref.authUser;
      return (0, _userServices.users)(_, args, {
        models: {
          user: _user
        },
        authUser: authUser
      }, info);
    },
    adminUsers: function adminUsers(_, args, _ref2, info) {
      var user = _ref2.models.user,
          authUser = _ref2.authUser;
      return (0, _userServices.adminUsers)(_, args, {
        models: {
          user: user
        },
        authUser: authUser
      }, info);
    },
    userById: function userById(_, data, _ref3, info) {
      var models = _ref3.models,
          authUser = _ref3.authUser;
      return (0, _util.requiresLogin)((0, _userServices.userById)(_, data, {
        models: models,
        authUser: authUser
      }, info));
    },
    userByEmailId: function () {
      var _userByEmailId = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref4, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                models = _ref4.models, authUser = _ref4.authUser;
                _context.next = 3;
                return models.user.findOne({
                  email: data.email
                });

              case 3:
                user1 = _context.sent;
                return _context.abrupt("return", user1);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function userByEmailId(_x, _x2, _x3, _x4) {
        return _userByEmailId.apply(this, arguments);
      }

      return userByEmailId;
    }(),
    userByExamCenter: function () {
      var _userByExamCenter = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref5, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                models = _ref5.models, authUser = _ref5.authUser;
                _context2.next = 3;
                return models.user.find({
                  examCenterName: data.examCenter
                });

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

      function userByExamCenter(_x5, _x6, _x7, _x8) {
        return _userByExamCenter.apply(this, arguments);
      }

      return userByExamCenter;
    }()
  },
  Mutation: {
    createUser: function () {
      var _createUser2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref6, info) {
        var user;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                user = _ref6.models.user;
                return _context3.abrupt("return", (0, _userServices.createUser)(_, data, {
                  models: {
                    user: user
                  }
                }, info));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createUser(_x9, _x10, _x11, _x12) {
        return _createUser2.apply(this, arguments);
      }

      return createUser;
    }(),
    createAdminUser: function () {
      var _createAdminUser2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
        var user;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                user = _ref7.models.user;
                return _context4.abrupt("return", (0, _userServices.createAdminUser)(_, data, {
                  models: {
                    user: user
                  }
                }, info));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function createAdminUser(_x13, _x14, _x15, _x16) {
        return _createAdminUser2.apply(this, arguments);
      }

      return createAdminUser;
    }(),
    updateUser: function updateUser(_, data, _ref8, info) {
      var user = _ref8.models.user;
      return (0, _util.requiresLogin)((0, _userServices.updateUser)(_, data, {
        models: {
          user: user
        }
      }, info));
    },
    removeUser: function removeUser(_, data, _ref9, info) {
      var user = _ref9.models.user;
      return (0, _util.requiresLogin)((0, _userServices.removeUser)(_, data, {
        models: {
          user: user
        }
      }, info));
    },
    login: function login(_, data, ctx, info) {
      return (0, _userServices.login)(_, data, ctx, info);
    },
    createUserFromAdmin: function createUserFromAdmin(_, data, _ref10, info) {
      var user = _ref10.models.user,
          authUser = _ref10.authUser;
      return (0, _util.requiresLogin)((0, _userServices.createUserFromAdmin)(_, data, {
        models: {
          user: user
        },
        authUser: authUser
      }, info));
    },
    urlExists: function () {
      var _urlExists = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref11, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                models = _ref11.models, authUser = _ref11.authUser;
                console.log(data);
                _context5.next = 4;
                return models.user.find({
                  url: data.url,
                  role: 'admin'
                });

              case 4:
                user1 = _context5.sent;
                console.log(user1);
                return _context5.abrupt("return", user1 ? user1[0] : []);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function urlExists(_x17, _x18, _x19, _x20) {
        return _urlExists.apply(this, arguments);
      }

      return urlExists;
    }(),
    emailAccountVerification: function () {
      var _emailAccountVerification = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_, data, _ref12, info) {
        var models, authUser, user1;
        return _regenerator.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                models = _ref12.models, authUser = _ref12.authUser;
                console.log(data);
                _context6.next = 4;
                return models.user.findOneAndUpdate({
                  _id: data.id,
                  emailVerificationToken: data.code
                }, {
                  $set: {
                    isVerified: true
                  }
                }, {
                  new: true
                });

              case 4:
                user1 = _context6.sent;
                console.log(user1);
                return _context6.abrupt("return", user1 ? user1 : []);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function emailAccountVerification(_x21, _x22, _x23, _x24) {
        return _emailAccountVerification.apply(this, arguments);
      }

      return emailAccountVerification;
    }()
  },
  User: {
    id: function () {
      var _id = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(root, args, _ref13, info) {
        var idLoader, authUser, id;
        return _regenerator.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                idLoader = _ref13.loaders.idLoader, authUser = _ref13.authUser;
                console.log(root);
                _context7.next = 4;
                return idLoader.load(root._id);

              case 4:
                id = _context7.sent;
                return _context7.abrupt("return", id);

              case 6:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function id(_x25, _x26, _x27, _x28) {
        return _id.apply(this, arguments);
      }

      return id;
    }() // result: async (root, data, { models: { result }, loaders: { userResultLoader }, authUser }, info) => {
    //   const fields = requestedFields(info, 'Result')
    //   // console.dir(fields)
    //   if (root.role === 'user') {
    //     const userGroup = await userResultLoader.load(root._id)
    //     return userGroup
    //   } else {
    //     const userGroup = await result.find({ userId: root._id }).lean()
    //     return userGroup
    //   }
    //   //      return null
    // }

  }
};