"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype Level{\n  id: ID\n\n  url:String\n  createdAt:Date\n  levelName:String\n}\n\ntype levelResponse{\n    level:Level\n    token:String\n}\n\n\nextend type Query {\nlevel(cursor:String):[Level]\nlevelById(id:ID):Level\n}\n\nextend type Mutation {\ncreateLevel(levelName:String):Level\nupdateLevel(id:ID,levelName:String):Level\nremoveLevel(id:ID):Level\n\n\n}\n";
var _default = type;
exports.default = _default;