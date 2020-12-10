"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.idLoader = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dataloader = _interopRequireDefault(require("dataloader"));

// import result from '../result/result.model'
// const _ = require('lodash')
var idLoader = function idLoader() {
  return new _dataloader.default( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(projectIds) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", projectIds.map(function (projectId) {
                return projectId.toString();
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}; // export const userResultLoader = () => {
//   return new DataLoader(projectIds => {
//     return result
//       .find({ userId: { $in: projectIds } })
//       .lean()
//       .exec()
//       .then(projects => {
//         //        console.log('projects loader batch: ', projectIds.length)
//         const projectsById = _.groupBy(projects, 'userId')
//         return projectIds.map(projectId => projectsById[projectId])
//       })
//   })
// }


exports.idLoader = idLoader;