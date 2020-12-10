"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype Subject{\n  id: ID\n\n  url:String\n  createdAt:Date\n  subjectName:String\n  questionCount:Int\n}\n\ntype subjectResponse{\n    subject:Subject\n    token:String\n}\n\ntype SubjectResponse{\n   docs:[Subject ]\n  totalDocs: Int\n  limit: Int\n  page: Int\n  totalPages: Int\n  pagingCounter: Int\n  hasPrevPage: Boolean\n  hasNextPage: Boolean\n  prevPage: Int\n  nextPage: Int\n}\n\nextend type Query {\nsubject(cursor:String):[Subject]\nsubjectById(id:ID):Subject\n\n}\n\nextend type Mutation {\ncreateSubject(subjectName:String):Subject\nupdateSubject(id:ID,subjectName:String):Subject\nremoveSubject(id:ID,):Subject\nsubjectByName(name:String):[Subject]\nsubjectWiseQuestion(id:String,count:Int):[qBank]\n\n\n\n}\n";
var _default = type;
exports.default = _default;