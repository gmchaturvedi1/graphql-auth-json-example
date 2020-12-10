"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.qPackDetailLoader = exports.userDetailLoader = exports.quizResultLoader = exports.userGroupDetailLoader = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

var _userGroup = _interopRequireDefault(require("../userGroup/userGroup.model"));

var _qPack = _interopRequireDefault(require("../questionPack/qPack.model"));

var _result = _interopRequireDefault(require("../result/result.model"));

var _user = _interopRequireDefault(require("../users/user.model"));

var _ = require('lodash');

var userGroupDetailLoader = function userGroupDetailLoader() {
  return new _dataloader.default(function (projectIds) {
    return _userGroup.default.find({
      _id: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      // console.log('userGroup loader batch: ', projectIds.length)
      var projectsById = _.keyBy(projects, '_id');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.userGroupDetailLoader = userGroupDetailLoader;

var quizResultLoader = function quizResultLoader() {
  return new _dataloader.default(function (projectIds) {
    console.log(projectIds);
    return _result.default.find({
      quizId: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      // console.log('userGroup loader batch: ', projectIds.length)
      var projectsById = _.keyBy(projects, 'quizId');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.quizResultLoader = quizResultLoader;

var userDetailLoader = function userDetailLoader() {
  return new _dataloader.default(function (projectIds) {
    console.log(projectIds);
    return _user.default.find({
      _id: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      // console.log('userGroup loader batch: ', projectIds.length)
      var projectsById = _.keyBy(projects, '_id');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.userDetailLoader = userDetailLoader;

var qPackDetailLoader = function qPackDetailLoader() {
  return new _dataloader.default(function (projectIds) {
    return _qPack.default.find({
      _id: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      // console.log('qPack loader batch: ', projectIds.length)
      var projectsById = _.keyBy(projects, '_id');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.qPackDetailLoader = qPackDetailLoader;