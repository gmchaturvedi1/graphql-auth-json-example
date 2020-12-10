"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\nscalar Upload\n\ntype File {\n    id: ID!\n    path: String!\n    filename: String!\n    mimetype: String!\n    encoding: String!\n  }\n\n\ntype qBank{\nid:ID\n      qbank:File\n     createdAt: Date\n     qType: String\n     question:  String\n     questionDescription: String\n     answers: [Option]\n     questionDirection: String\n     explanation: String\n     url: String\n     subject: String\n     isAnswered: String\n     timeTaken: Int\n     selectedOption: String\n     flag: String\n     visited:String\n     correctAnswer: String\n     level: String\n     mark:Float\n     negativeMark:Float\n     questStatus:String\n     subjectDetail:Subject\n     levelDetail:Level\n}\n\n\ntype Option{\n     label:  String\n     point: String\n}\n\n\n\n\ntype qBankResponse{\n    qBank:qBank\n    token:String\n}\n\n\nextend type Query {\n    qBank(cursor:String):[qBank]\n    qbankById(id:ID):qBank\n}\n\nextend type Mutation {\n  createQbank(question:String,subject:String,level:String,questionDirection:String,explanation:String,optionA:String,\n    optionB:String,optionC:String,optionD:String,qType:String,correctAnswer:String):qBank\n  updateQbank(id:ID,question:String,subject:String,level:String,questionDirection:String,explanation:String,\n    optionA:String,\n    optionB:String,optionC:String,optionD:String,qType:String,correctAnswer:String):qBank\n  removeQbank(id:ID):qBank\n  uploadQbank(qbank:Upload):qBank\n}\n";
var _default = type;
exports.default = _default;