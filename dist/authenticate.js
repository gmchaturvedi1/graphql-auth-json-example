"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// const { ObjectId } = require( 'mongodb' )
// import user from './newApi/users/user.model'
// const HEADER_REGEX = /bearer token-(.*)$/
var jwt = require('jsonwebtoken');

var config = {
  secret: 'thisismysecret'
};

var authenticate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(authorization, Users) {
    var decode, user;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!authorization || authorization === 'null')) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", null);

          case 4:
            _context.next = 6;
            return jwt.verify(authorization, config.secret);

          case 6:
            decode = _context.sent;
            _context.next = 9;
            return Users.find({
              _id: decode.subject
            }).lean();

          case 9:
            user = _context.sent;
            return _context.abrupt("return", user[0]);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function authenticate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = authenticate;