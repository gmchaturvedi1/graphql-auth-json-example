"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUserFromAdmin = exports.login = exports.removeUser = exports.updateUser = exports.createUser = exports.createAdminUser = exports.userById = exports.adminUsers = exports.users = exports.user = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));

var _mail = require("../../../mail.config");

var _sendgridMail = _interopRequireDefault(require("../../../sendgrid.mail.config"));

var _mailTemplates = require("../../../utils/mailTemplates");

var _uuid = require("uuid");

var _util = require("../../common/util");

// import { tokenForUser } from '../../common/token'
// import dummy from './dummy'
var user = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, args, _ref, info) {
    var user, authUser;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.models.user, authUser = _ref.authUser;
            console.log(user);
            return _context.abrupt("return", authUser);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function user(_x, _x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.user = user;

var users = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, args, _ref3, info) {
    var user, authUser;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = _ref3.models.user, authUser = _ref3.authUser;
            return _context2.abrupt("return", authUser);

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function users(_x5, _x6, _x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.users = users;

var adminUsers = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref5, info) {
    var user, authUser, fields, user1;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = _ref5.models.user, authUser = _ref5.authUser;

            if (!(authUser.role === 'admin')) {
              _context3.next = 11;
              break;
            }

            fields = (0, _util.requestedFields)(info);
            fields.role = 1; //    console.time('Full Record with Limit and Filter')

            _context3.next = 6;
            return user.find({
              role: 'user',
              url: authUser.url
            }).sort({
              createdAt: -1
            }).where('createdAt').lt(data.cursor).limit(10).limit(10).lean();

          case 6:
            user1 = _context3.sent;
            console.log(user1.length);
            return _context3.abrupt("return", user1);

          case 11:
            return _context3.abrupt("return", []);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function adminUsers(_x9, _x10, _x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.adminUsers = adminUsers;

var userById = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref7, info) {
    var models, authUser, user1;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            models = _ref7.models, authUser = _ref7.authUser;
            _context4.next = 3;
            return models.user.findById(data.id).lean();

          case 3:
            user1 = _context4.sent;
            console.log(user1);
            return _context4.abrupt("return", user1);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function userById(_x13, _x14, _x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.userById = userById;

var createAdminUser = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref9, info) {
    var user, user1, salt, hash, createdUser;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            user = _ref9.models.user;
            _context5.next = 3;
            return user.find({
              email: data.email
            }).lean();

          case 3:
            user1 = _context5.sent;

            if (!(user1.length > 0)) {
              _context5.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('Email Id already registered');

          case 6:
            salt = _bcryptNodejs.default.genSaltSync(10);
            hash = _bcryptNodejs.default.hashSync(data.password, salt);
            _context5.next = 10;
            return user.create({
              email: data.email,
              isVerified: false,
              emailVerificationToken: (0, _uuid.v4)(),
              password: hash,
              firstName: data.firstName,
              lastName: data.lastName,
              name: data.name,
              role: 'admin',
              mobileNumber: data.mobileNumber,
              url: data.url
            });

          case 10:
            createdUser = _context5.sent;

            _sendgridMail.default.send((0, _mailTemplates.newRegister)(createdUser), function (error, body) {
              if (error) console.log(error);
              console.log(body);
            }); // mg.messages().send(newRegister(createdUser), (error, body) => {
            //   if (error) console.log(error)
            //   console.log(body)
            // })


            return _context5.abrupt("return", createdUser);

          case 13:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function createAdminUser(_x17, _x18, _x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}();

exports.createAdminUser = createAdminUser;

var createUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_, data, _ref11, info) {
    var user, user1, salt, hash, createdUser;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            user = _ref11.models.user;
            _context6.next = 3;
            return user.find({
              email: data.email
            }).lean();

          case 3:
            user1 = _context6.sent;

            if (!(user1.length > 0)) {
              _context6.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('Email Id already registered');

          case 6:
            salt = _bcryptNodejs.default.genSaltSync(10);
            hash = _bcryptNodejs.default.hashSync(data.password, salt);
            _context6.next = 10;
            return user.create({
              email: data.email,
              password: hash,
              firstName: data.firstName,
              lastName: data.lastName,
              role: 'user',
              mobileNumber: data.mobileNumber,
              url: data.url
            });

          case 10:
            createdUser = _context6.sent;
            return _context6.abrupt("return", createdUser);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function createUser(_x21, _x22, _x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var updateUser = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee7(_, data, _ref13, info) {
    var user, user1, salt, hash, _user, updatedUser;

    return _regenerator.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            user = _ref13.models.user;
            _context7.next = 3;
            return user.findById(data.id).lean();

          case 3:
            user1 = _context7.sent;

            if (user1) {
              _context7.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('No User Found');

          case 6:
            salt = _bcryptNodejs.default.genSaltSync(10);
            hash = null;

            if (!data.password) {
              _context7.next = 12;
              break;
            }

            hash = _bcryptNodejs.default.hashSync(data.password, salt);
            _context7.next = 16;
            break;

          case 12:
            _context7.next = 14;
            return user.findById(data.id).lean();

          case 14:
            _user = _context7.sent;
            hash = _user.password;

          case 16:
            data.password = hash;
            _context7.next = 19;
            return user.findByIdAndUpdate(data.id, {
              $set: data
            });

          case 19:
            updatedUser = _context7.sent;
            return _context7.abrupt("return", updatedUser);

          case 21:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function updateUser(_x25, _x26, _x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var removeUser = /*#__PURE__*/function () {
  var _ref16 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee8(_, data, _ref15, info) {
    var user, user1, removedUser;
    return _regenerator.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            user = _ref15.models.user;
            _context8.next = 3;
            return user.findById(data.id).lean();

          case 3:
            user1 = _context8.sent;

            if (!(user1.length < 1)) {
              _context8.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('No User Found');

          case 6:
            _context8.next = 8;
            return user.findByIdAndRemove(data.id);

          case 8:
            removedUser = _context8.sent;
            return _context8.abrupt("return", removedUser);

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function removeUser(_x29, _x30, _x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}();

exports.removeUser = removeUser;

var login = /*#__PURE__*/function () {
  var _ref17 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee9(_, data, ctx, info) {
    var email, password, _user2;

    return _regenerator.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            email = data.email, password = data.password;
            _context9.next = 4;
            return ctx.models.user.findOne({
              email: email
            });

          case 4:
            _user2 = _context9.sent;

            if (_user2) {
              _context9.next = 7;
              break;
            }

            throw new _apolloServerCore.UserInputError('The email address ' + email + ' is not associated with any account. Double-check your email address and try again.');

          case 7:
            if (_user2.comparePassword(password)) {
              _context9.next = 9;
              break;
            }

            throw new _apolloServerCore.UserInputError('Invalid email or password');

          case 9:
            // Make sure the user has been verified
            //        if (!user.isVerified) return res.status(401).json( type: 'not-verified', message: 'Your account has not been verified.' });
            console.log(_user2.generateJWT()); // ctx.response.cookie('token', user.generateJWT(), {
            //   httpOnly: false,
            //   // secure: false,
            //   maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
            // })

            return _context9.abrupt("return", {
              user: _user2,
              token: _user2.generateJWT()
            });

          case 13:
            _context9.prev = 13;
            _context9.t0 = _context9["catch"](0);
            throw new _apolloServerCore.UserInputError(_context9.t0.message);

          case 16:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, null, [[0, 13]]);
  }));

  return function login(_x33, _x34, _x35, _x36) {
    return _ref17.apply(this, arguments);
  };
}();

exports.login = login;

var createUserFromAdmin = /*#__PURE__*/function () {
  var _ref19 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee10(_, data, _ref18, info) {
    var user, authUser, user1, salt, hash, createdFromAdmin;
    return _regenerator.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            user = _ref18.models.user, authUser = _ref18.authUser;
            _context10.next = 3;
            return user.find({
              email: data.email,
              url: authUser.url
            });

          case 3:
            user1 = _context10.sent;

            if (!(user1.length > 0)) {
              _context10.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('Email Id already registered');

          case 6:
            salt = _bcryptNodejs.default.genSaltSync(10);
            hash = _bcryptNodejs.default.hashSync(data.password, salt);
            data.role = 'user';
            data.url = authUser.url;
            data.password = hash;
            console.log(data);
            _context10.next = 14;
            return user.create(data);

          case 14:
            createdFromAdmin = _context10.sent;
            return _context10.abrupt("return", createdFromAdmin);

          case 16:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function createUserFromAdmin(_x37, _x38, _x39, _x40) {
    return _ref19.apply(this, arguments);
  };
}(); // export const result = async (root, args, { models: { result }, authUser }, info) => {
//   // console.log(root)
//   const userGroup = await result.find({ userId: root._id }).lean()
//   // console.log(userGroup)
//   return userGroup
// }
// ctx.response.cookie('token', token, {
// httpOnly: true,
// maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
// domain: 'http://localhost:4000',
// });


exports.createUserFromAdmin = createUserFromAdmin;