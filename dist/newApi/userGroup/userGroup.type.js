"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\ntype  userGroup{\n id: ID\n      url:String\n  createdAt:Date\n  userGroupName:String\n}\n\ntype userGroupResponse{\n    userGroup:userGroup\n\n}\n\n\n\nextend type Query {\n  userGroup(cursor:String):[userGroup]\n  userGroupById(id:ID):userGroup\n}\n\nextend type Mutation {\ncreateUserGroup(userGroupName:String):userGroup\nupdateUserGroup(id:ID,userGroupName:String):userGroup\nremoveUserGroup(id:ID):userGroup\n\n\n}\n";
var _default = type;
exports.default = _default;