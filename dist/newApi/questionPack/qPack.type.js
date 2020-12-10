"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype questionOfPack{\n  id:String\n  positiveMarks:String\n  negativeMarks:String\n  questionDetail:qBank\n}\n\n\n\ntype QuestionPack{\n  id: ID\n  url:String\n  createdAt:Date\n  qPackName:String\n  questions:[questionOfPack]\n}\n\ninput questionOfPackInput{\n  id:String\n  positiveMarks:String\n  negativeMarks:String\n}\n\nextend type Query {\nqPack(cursor:String):[QuestionPack]\nqPackById(id:ID):QuestionPack\n}\n\nextend type Mutation {\ncreateQPack(qPackName:String,questions:[questionOfPackInput]):QuestionPack\nupdateQPack(id:ID,qPackName:String,questions:[questionOfPackInput]):QuestionPack\nremoveQPack(id:ID):QuestionPack\n}\n";
var _default = type;
exports.default = _default;