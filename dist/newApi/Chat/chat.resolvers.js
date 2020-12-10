"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _util = require("../common/util");

module.exports = {
  Query: {
    messages: (0, _util.requiresLogin)( /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref, info) {
        var message, authUser, msgFind;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                message = _ref.models.message, authUser = _ref.authUser;
                _context.next = 3;
                return message.find();

              case 3:
                msgFind = _context.sent;
                return _context.abrupt("return", msgFind);

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
    hello: function hello() {
      return "Hello";
    }
  },
  Counter: {
    countStr: function countStr(counter) {
      return "Current count: ".concat(counter.count);
    }
  },
  Message: {
    users: function () {
      var _users = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_ref3, data, _ref4) {
        var senderMail, user;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                senderMail = _ref3.senderMail;
                user = _ref4.user;
                return _context2.abrupt("return", user.find({
                  email: senderMail
                }));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function users(_x5, _x6, _x7) {
        return _users.apply(this, arguments);
      }

      return users;
    }()
  },
  Mutation: {
    userTyping: function userTyping(_, _ref5, _ref6) {
      var email = _ref5.email,
          receiverMail = _ref5.receiverMail;
      var pubsub = _ref6.pubsub;
      pubsub.publish("userTyping", {
        userTyping: email,
        receiverMail: receiverMail
      });
      return true;
    },
    createMessage: function () {
      var _createMessage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, _ref7, _ref8) {
        var senderMail, receiverMail, message, timestamp, pubsub, userText;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                senderMail = _ref7.senderMail, receiverMail = _ref7.receiverMail, message = _ref7.message, timestamp = _ref7.timestamp;
                pubsub = _ref8.pubsub;
                userText = new Message({
                  senderMail: senderMail,
                  receiverMail: receiverMail,
                  message: message,
                  timestamp: timestamp
                });
                _context3.next = 5;
                return userText.save();

              case 5:
                pubsub.publish("newMessage", {
                  newMessage: userText,
                  receiverMail: receiverMail
                });
                return _context3.abrupt("return", userText);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createMessage(_x8, _x9, _x10) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }(),
    updateMessage: function () {
      var _updateMessage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, _ref9) {
        var id, message, userText;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref9.id, message = _ref9.message;
                _context4.next = 3;
                return Message.findOneAndUpdate({
                  _id: id
                }, {
                  message: message
                }, {
                  new: true
                });

              case 3:
                userText = _context4.sent;
                return _context4.abrupt("return", userText);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updateMessage(_x11, _x12) {
        return _updateMessage.apply(this, arguments);
      }

      return updateMessage;
    }(),
    deleteMessage: function () {
      var _deleteMessage = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, _ref10) {
        var id;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref10.id;
                _context5.next = 3;
                return Message.findOneAndDelete({
                  _id: id
                });

              case 3:
                return _context5.abrupt("return", true);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteMessage(_x13, _x14) {
        return _deleteMessage.apply(this, arguments);
      }

      return deleteMessage;
    }()
  },
  Subscription: {
    newMessage: {
      subscribe: function subscribe(_, _ref11, _ref12) {
        (0, _objectDestructuringEmpty2.default)(_ref11);
        var pubsub = _ref12.pubsub,
            withFilter = _ref12.withFilter;
        return withFilter(function () {
          return pubsub.asyncIterator("newMessage");
        }, function (payload, variables) {
          return payload.receiverMail === variables.receiverMail;
        });
      }
    },
    counter: {
      subscribe: function subscribe(parent, args, _ref13) {
        var pubsub = _ref13.pubsub;
        var channel = Math.random().toString(36).substring(2, 15); // random channel name

        var count = 0;
        setInterval(function () {
          return pubsub.publish(channel, {
            counter: {
              count: count++
            }
          });
        }, 2000);
        return pubsub.asyncIterator(channel);
      }
    },
    newUser: {
      subscribe: function subscribe(_, _ref14, _ref15) {
        (0, _objectDestructuringEmpty2.default)(_ref14);
        var pubsub = _ref15.pubsub;
        return pubsub.asyncIterator("newUser");
      }
    },
    oldUser: {
      subscribe: function subscribe(_, _ref16, _ref17) {
        (0, _objectDestructuringEmpty2.default)(_ref16);
        var pubsub = _ref17.pubsub;
        return pubsub.asyncIterator("oldUser");
      }
    },
    userTyping: {
      subscribe: function subscribe(_, _ref18, _ref19) {
        (0, _objectDestructuringEmpty2.default)(_ref18);
        var pubsub = _ref19.pubsub,
            withFilter = _ref19.withFilter;
        return withFilter(function () {
          return pubsub.asyncIterator("userTyping");
        }, function (payload, variables) {
          return payload.receiverMail === variables.receiverMail;
        });
      }
    }
  }
};