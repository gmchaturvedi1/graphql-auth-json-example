"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qPackQuestionsLoader = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

var _qbank = _interopRequireDefault(require("../qbank/qbank.model"));

var _ = require('lodash');

var qPackQuestionsLoader = function qPackQuestionsLoader() {
  return new _dataloader.default(function (projectIds) {
    return _qbank.default.find({
      _id: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      //  console.log('QPack Question loader batch: ', projectIds.length)
      var projectsById = _.keyBy(projects, '_id');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.qPackQuestionsLoader = qPackQuestionsLoader;