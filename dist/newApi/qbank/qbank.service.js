"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadQbankService = exports.removeQbankService = exports.updateQbankService = exports.createQbankService = exports.qbankByIdService = exports.qBankService = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerCore = require("apollo-server-core");

var _path = _interopRequireDefault(require("path"));

// import Upload from '../../uploadQbank'
// import mammoth from 'mammoth'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt-nodejs'
// import path from 'path'
var mkdirp = require('mkdirp');

var _require = require('fs'),
    createWriteStream = _require.createWriteStream,
    unlinkSync = _require.unlinkSync;

var uploadDir = _path.default.join(__dirname, '../../../../uploads/'); // Ensure upload directory exists


mkdirp.sync(uploadDir);

var storeFS = function storeFS(_ref) {
  var stream = _ref.stream,
      filename = _ref.filename;
  var id = Date.now() + filename;
  var path2 = "".concat(uploadDir, "/").concat(id);
  return new Promise(function (resolve, reject) {
    return stream.on('error', function (error) {
      if (stream.truncated) unlinkSync(path2); // Delete the truncated file

      reject(error);
    }).on('end', function () {
      return resolve({
        id: id,
        path2: path2
      });
    }).pipe(createWriteStream(path2));
  });
};

var qBankService = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(_, data, _ref2, info) {
    var qbank, authUser, userGroup;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            qbank = _ref2.models.qbank, authUser = _ref2.authUser;
            console.time('Qbank'); // console.time('qbank')

            _context.next = 4;
            return qbank.find({
              url: authUser.url
            }).sort({
              createdAt: -1
            }).where('createdAt').lt(data.cursor).limit(10).lean();

          case 4:
            userGroup = _context.sent;
            console.timeEnd('Qbank');
            return _context.abrupt("return", userGroup);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function qBankService(_x, _x2, _x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

exports.qBankService = qBankService;

var qbankByIdService = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(_, data, _ref4, info) {
    var models, authUser, user1;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            models = _ref4.models, authUser = _ref4.authUser;
            console.time('QbankByID');
            _context2.next = 4;
            return models.qbank.findById(data.id).lean();

          case 4:
            user1 = _context2.sent;
            console.timeEnd('QbankByID'); // const user2 = await models.qbank.findById(data.id).lean().explain()
            // console.log(user2)

            return _context2.abrupt("return", user1);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function qbankByIdService(_x5, _x6, _x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();

exports.qbankByIdService = qbankByIdService;

var createQbankService = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(_, data, _ref6, info) {
    var qbank, authUser, userGroup1, createQuestion1, _createQuestion, _createQuestion2, _createQuestion3;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            qbank = _ref6.models.qbank, authUser = _ref6.authUser;
            _context3.next = 3;
            return qbank.find({
              question: data.question,
              url: authUser.url
            });

          case 3:
            userGroup1 = _context3.sent;

            if (!(userGroup1.length > 0)) {
              _context3.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('Question already exist');

          case 6:
            if (!(data.qType === 'trueFalse')) {
              _context3.next = 11;
              break;
            }

            _context3.next = 9;
            return qbank.create({
              url: authUser.url,
              question: data.question,
              answers: [{
                label: 'True',
                point: 'true'
              }, {
                label: 'False',
                point: 'false'
              }],
              subject: data.subject,
              level: data.level,
              qType: data.qType,
              correctAnswer: data.correctAnswer,
              questionDirection: data.questionDirection,
              explanation: data.explanation
            });

          case 9:
            createQuestion1 = _context3.sent;
            return _context3.abrupt("return", createQuestion1);

          case 11:
            if (!(data.qType === 'mcq')) {
              _context3.next = 16;
              break;
            }

            _context3.next = 14;
            return qbank.create({
              url: authUser.url,
              question: data.question,
              answers: [{
                label: data.optionA,
                point: 'A'
              }, {
                label: data.optionB,
                point: 'B'
              }, {
                label: data.optionC,
                point: 'C'
              }, {
                label: data.optionD,
                point: 'D'
              }],
              subject: data.subject,
              level: data.level,
              qType: data.qType,
              correctAnswer: data.correctAnswer,
              questionDirection: data.questionDirection,
              explanation: data.explanation
            });

          case 14:
            _createQuestion = _context3.sent;
            return _context3.abrupt("return", _createQuestion);

          case 16:
            if (!(data.qType === 'yesNo')) {
              _context3.next = 21;
              break;
            }

            _context3.next = 19;
            return qbank.create({
              url: authUser.url,
              question: data.question,
              answers: [{
                label: 'Yes',
                point: 'yes'
              }, {
                label: 'No',
                point: 'no'
              }],
              subject: data.subject,
              level: data.level,
              qType: data.qType,
              correctAnswer: data.correctAnswer,
              questionDirection: data.questionDirection,
              explanation: data.explanation
            });

          case 19:
            _createQuestion2 = _context3.sent;
            return _context3.abrupt("return", _createQuestion2);

          case 21:
            if (!(data.qType === 'fillBlanks')) {
              _context3.next = 26;
              break;
            }

            _context3.next = 24;
            return qbank.create({
              url: authUser.url,
              question: data.question,
              subject: data.subject,
              answers: [{
                label: '',
                point: ''
              }, {
                label: '',
                point: ''
              }],
              level: data.level,
              qType: data.qType,
              correctAnswer: data.correctAnswer,
              questionDirection: data.questionDirection,
              explanation: data.explanation
            });

          case 24:
            _createQuestion3 = _context3.sent;
            return _context3.abrupt("return", _createQuestion3);

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createQbankService(_x9, _x10, _x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();

exports.createQbankService = createQbankService;

var updateQbankService = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(_, data, _ref8, info) {
    var qbank, authUser, user1, createQuestion1, _createQuestion4, _createQuestion5, _createQuestion6;

    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            qbank = _ref8.models.qbank, authUser = _ref8.authUser;
            _context4.next = 3;
            return qbank.findById(data.id);

          case 3:
            user1 = _context4.sent;

            if (user1) {
              _context4.next = 6;
              break;
            }

            throw new _apolloServerCore.UserInputError('No Question  Found');

          case 6:
            if (!(data.qType === 'trueFalse')) {
              _context4.next = 11;
              break;
            }

            _context4.next = 9;
            return qbank.findByIdAndUpdate(data.id, {
              $set: {
                url: authUser.url,
                question: data.question,
                answers: [{
                  label: 'True',
                  point: 'true'
                }, {
                  label: 'False',
                  point: 'false'
                }],
                subject: data.subject,
                level: data.level,
                qType: data.qType,
                correctAnswer: data.correctAnswer,
                questionDirection: data.questionDirection,
                explanation: data.explanation
              }
            });

          case 9:
            createQuestion1 = _context4.sent;
            return _context4.abrupt("return", createQuestion1);

          case 11:
            if (!(data.qType === 'mcq')) {
              _context4.next = 16;
              break;
            }

            _context4.next = 14;
            return qbank.findByIdAndUpdate(data.id, {
              $set: {
                url: authUser.url,
                question: data.question,
                answers: [{
                  label: data.optionA,
                  point: 'A'
                }, {
                  label: data.optionB,
                  point: 'B'
                }, {
                  label: data.optionC,
                  point: 'C'
                }, {
                  label: data.optionD,
                  point: 'D'
                }],
                subject: data.subject,
                level: data.level,
                qType: data.qType,
                correctAnswer: data.correctAnswer,
                questionDirection: data.questionDirection,
                explanation: data.explanation
              }
            });

          case 14:
            _createQuestion4 = _context4.sent;
            return _context4.abrupt("return", _createQuestion4);

          case 16:
            if (!(data.qType === 'yesNo')) {
              _context4.next = 21;
              break;
            }

            _context4.next = 19;
            return qbank.findByIdAndUpdate(data.id, {
              $set: {
                url: authUser.url,
                question: data.question,
                answers: [{
                  label: 'Yes',
                  point: 'yes'
                }, {
                  label: 'No',
                  point: 'no'
                }],
                subject: data.subject,
                level: data.level,
                qType: data.qType,
                correctAnswer: data.correctAnswer,
                questionDirection: data.questionDirection,
                explanation: data.explanation
              }
            });

          case 19:
            _createQuestion5 = _context4.sent;
            return _context4.abrupt("return", _createQuestion5);

          case 21:
            if (!(data.qType === 'fillBlanks')) {
              _context4.next = 26;
              break;
            }

            _context4.next = 24;
            return qbank.findByIdAndUpdate(data.id, {
              $set: {
                url: authUser.url,
                question: data.question,
                subject: data.subject,
                answers: [{
                  label: '',
                  point: ''
                }, {
                  label: '',
                  point: ''
                }],
                level: data.level,
                qType: data.qType,
                correctAnswer: data.correctAnswer,
                questionDirection: data.questionDirection,
                explanation: data.explanation
              }
            });

          case 24:
            _createQuestion6 = _context4.sent;
            return _context4.abrupt("return", _createQuestion6);

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateQbankService(_x13, _x14, _x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

exports.updateQbankService = updateQbankService;

var removeQbankService = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(_, data, _ref10, info) {
    var qbank, authUser, user1, _user;

    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            qbank = _ref10.models.qbank, authUser = _ref10.authUser;
            _context5.next = 3;
            return qbank.findById(data.id);

          case 3:
            user1 = _context5.sent;

            if (!(user1.length < 1)) {
              _context5.next = 8;
              break;
            }

            throw new _apolloServerCore.UserInputError('No User Found');

          case 8:
            _context5.next = 10;
            return qbank.findByIdAndRemove(data.id);

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

  return function removeQbankService(_x17, _x18, _x19, _x20) {
    return _ref11.apply(this, arguments);
  };
}();

exports.removeQbankService = removeQbankService;

var uploadQbankService = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(_, data, _ref12, info) {
    var qbank, authUser;
    return _regenerator.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            qbank = _ref12.models.qbank, authUser = _ref12.authUser;

            if (authUser) {
              _context6.next = 3;
              break;
            }

            throw new _apolloServerCore.UserInputError('User Not Authenticated');

          case 3:
            // const { stream, filename, mimetype, encoding } = await data.qbank
            // const { id, path2 } = await storeFS({ stream, filename })
            storeFS(1, 1);

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function uploadQbankService(_x21, _x22, _x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}(); // console.log(id, path2)
// const uploaded = await Upload(id)
// uploaded.questions.map(d=>console.log(d))
// var options = {
//     convertImage: mammoth.images.imgElement(function (image) {
//         return image.read("base64").then(function (imageBuffer) {
//             return {
//                 src: "data:" + image.contentType + ";base64," + imageBuffer,
//                 "max-width": "100%",
//                 height: "auto"
//             };
//         });
//     })
// };
// mammoth.convertToHtml({ path: `../../uploads/${id}` }, options)
//     .then(function (result) {
//         var html = result.value; // The generated HTML
//         var messages = result.messages; // Any messages, such as warnings during conversion
//         console.log(html)
//     })
//     .done();


exports.uploadQbankService = uploadQbankService;