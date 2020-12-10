"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype response{\n         qId:String,\n         qDetail:qBank\n          timeTaken: Int\n          isAnswered:Boolean\n          selectedOption:String\n          review:Boolean\n          visited:Boolean\n}\ntype Reports{\n    question:String\n}\ntype Result\n{\n    id:ID\n    createdAt:Date\n    updatedAt:Date\n    quizId: String\n   quizTemplate:String\n    userid:String\n    userDetail:User\n    submit:Boolean\n    quizStartTime:String\n    quizEndTime:String\n    userGroupId:String\n    userGroupDetail:userGroup\n    url:String\n    qPackId:String\n    qPackDetail:QuestionPack\n    quizName:  String\n    quizDescription:String\n    quizDuration:String\n    quizTimeLeft: Int,\n    quizAttempt:String\n    quizInstruction:String\n    response:[response]\n    lastResponseTime:Int\n    }\n\n\ninput  responseInput{\n         qId:String,\n          timeTaken: Int\n          isAnswered:Boolean\n          selectedOption:String\n          review:Boolean\n          visited:Boolean\n}\n\nextend type Query {\n    result(cursor:String):[Result]\n    resultById(id:ID):Result\n    resultsByQuizId(cursor:String,id:ID):[Result]\n\n}\n\nextend type Mutation {\n    createExamAttempt(id:ID):Result,\n    updateResponse(quizId:ID,quizDuration:Int,submit:Boolean,response:[responseInput],lastResponseTime:Int,submit:Boolean):Result\n    resultByEmail(email:String):User\n     resetAttempt(regNo:String,status:Boolean):User\n     resetDuration(regNo:String,quizDuration:String):User\n     resetStream(regNo:String,stream:String):User\n\n}\n";
var _default = type;
exports.default = _default;