"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype AdminDash{\n  quizCount:Int\n  resultCount:Int\n  userCount:Int\n  qPackCount:Int\n  qbankCount:Int\n\n\n}\n\ntype UserDash{\n  quizCount:Int\n  resultCount:Int\n  quizCompleted:Int\n  quizNotCompleted:Int\n}\n\nextend type Query {\nadminDash:AdminDash\nuserDash:UserDash\n}\n\n\n";
var _default = type;
exports.default = _default;