"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype response{\n        question:String,\n        qType:String\n        questionId:String,\n        questionDetail:qBank\n        timeTaken:Int,\n        selectedOption:String,\n        review:String,\n        visited:String\n}\n\ntype Reports{\n    question:String\n}\n\n\ntype Result\n{\n\n     id:ID\n\n     reports:Reports\n     index:Int\n     userDetail:User\n     lastResponseTime:String\n     quizName: String\n     quizDescription:String\n     quizDuration:Int\n     totalQuizDuration:Int\n     quizAttempt:String\n     quizInstruction:String\n     displayResult:select\n     displaySolution:select\n     displaySection:select\n     displayQuestionOrder:select\n     mandatory:select\n     sendEmail:select\n     sendSms:select\n     examSecurity:select\n     examView:select\n     pauseResume:select\n     navigation:select\n     resultType:select\n     passPercentage:Int\n     passFeedback:String\n     failFeedback:String\n     catWiseQuestions:[catWiseQuestions]\n     quizStartTime:String\n     quizEndTime:String\n     userGroup:select\n     sell:select\n     questions:[String]\n     adminId:String\n     userId:String\n     quizId:String\n     submit:Boolean\n     quizQuestions:[qBank]\n     response:[response]\n       totalQuizDurationTime:String\n\n    }\n\ninput  responseInput{\n        questionId:String,\n        timeTaken:Int,\n        selectedOption:String,\n        review:String,\n        visited:String,\n}\n\nextend type Query {\n    result:[Result]\n    resultById(_id:String):Result\n}\n\nextend type Mutation {\n    createExamAttempt(id:String):Result,\n    updateResponse(quizId:String,quizDuration:Int,submit:Boolean,\n        response:[responseInput]):Result\n}\n";
var _default = type;
exports.default = _default;