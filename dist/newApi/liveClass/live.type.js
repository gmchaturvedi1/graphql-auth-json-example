"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\n\ntype Room{\n  id: ID\n  roomName:String\n  createdAt:Date\n}\n\n\n\nextend type Query {\nroom(cursor:String):[Room]\n}\n\nextend type Mutation {\ncreateLevel(levelName:String):Level\nupdateLevel(id:ID,levelName:String):Level\nremoveLevel(id:ID):Level\n}\n";
var _default = type;
exports.default = _default;