"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.levelDetailLoader = exports.subjectDetailLoader = void 0;

var _dataloader = _interopRequireDefault(require("dataloader"));

var _subject = _interopRequireDefault(require("../subject/subject.model"));

var _level = _interopRequireDefault(require("../level/level.model"));

var _ = require('lodash'); // export const idLoader = () => {
//   return new DataLoader(async projectIds => {
//     // const ids = await projectIds.map(d => ({ _id: d }))
//     //   console.group(projectIds)
//     return projectIds.map(projectId => projectId.toString())
//   })
// }


var subjectDetailLoader = function subjectDetailLoader() {
  return new _dataloader.default(function (projectIds) {
    return _subject.default.find({
      _id: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      //        console.log('projects loader batch: ', projectIds.length)
      var projectsById = _.keyBy(projects, '_id');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.subjectDetailLoader = subjectDetailLoader;

var levelDetailLoader = function levelDetailLoader() {
  return new _dataloader.default(function (projectIds) {
    return _level.default.find({
      _id: {
        $in: projectIds
      }
    }).lean().exec().then(function (projects) {
      console.log('projects loader batch: ', projectIds.length);

      var projectsById = _.keyBy(projects, '_id');

      return projectIds.map(function (projectId) {
        return projectsById[projectId];
      });
    });
  });
};

exports.levelDetailLoader = levelDetailLoader;