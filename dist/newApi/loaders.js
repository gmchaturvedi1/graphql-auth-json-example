"use strict";

var _qPack = require("./questionPack/qPack.loader");

var _quiz = require("./quiz/quiz.loader");

var _qbank = require("./qbank/qbank.loader");

var _user = require("./users/services/user.loader");

module.exports = function () {
  return {
    qPackQuestionsLoader: (0, _qPack.qPackQuestionsLoader)(),
    userGroupDetailLoader: (0, _quiz.userGroupDetailLoader)(),
    qPackDetailLoader: (0, _quiz.qPackDetailLoader)(),
    levelDetailLoader: (0, _qbank.levelDetailLoader)(),
    subjectDetailLoader: (0, _qbank.subjectDetailLoader)(),
    idLoader: (0, _user.idLoader)(),
    quizResultLoader: (0, _quiz.quizResultLoader)(),
    userDetailLoader: (0, _quiz.userDetailLoader)()
  };
}; // const { reposForOrg } = require('./github')
// const _ = require('lodash')
// const quizQuestionLoader = () => {
//   return new DataLoader(projectIds => {
//     return result.model
//       .find({ _id: { $in: projectIds } })
//       .exec()
//       .then(projects => {
//         console.log('projects loader batch: ', projectIds.length)
//         const projectsById = _.keyBy(projects, '_id')
//         return projectIds.map(projectId => projectsById[projectId])
//       })
//   })
// }
// const questionDetailLoader = () => {
//   return new DataLoader(projectIds => {
//     console.log(projectIds)
//     return qbank.model
//       .find({ _id: { $in: projectIds } })
//       .exec()
//       .then(projects => {
//         console.log('projects loader batch: ', projectIds.length)
//         const projectsById = _.keyBy(projects, '_id')
//         return projectIds.map(projectId => projectsById[projectId])
//       })
//   })
// }
// const createTaskLoader = () => {
//     return new DataLoader(taskIds => {
//         return Task.find({ _id: { $in: taskIds } })
//             .exec()
//             .then(tasks => {
//                 console.log('task loader batch: ', taskIds.length)
//                 const tasksById = _.keyBy(tasks, '_id')
//                 return taskIds.map(taskId => tasksById[taskId])
//             })
//     })
// }
// const createGitHubLoader = () => {
//     return new DataLoader(repoNames => {
//         return reposForOrg().then(repos => {
//             console.log('github loader batch: ', repoNames.length)
//             const reposByName = _.keyBy(repos, 'name')
//             return repoNames.map(repoName => reposByName[repoName])
//         })
//     })
// }