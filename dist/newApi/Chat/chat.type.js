"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var type = "\ntype Message {\n    id: ID!\n    message: String!\n    senderMail: String!\n    receiverMail: String!\n    timestamp: Float!\n    users: [User]\n  }\n\nextend type Query {\nmessages:[Message]\nhello: String!\n}\ntype Counter {\n    count: Int!\n    countStr: String\n  }\n\nextend  type Mutation {\n    userTyping(email: String! receiverMail: String!): Boolean!\n    createMessage(senderMail: String! receiverMail: String! message: String! timestamp: Float!): Message!\n    updateMessage(id: ID! message: String!): Message!\n    deleteMessage(id: String!): Boolean!\n  }\n\n  type Subscription {\n    newMessage(receiverMail: String!): Message\n    newUser: User\n    oldUser: String\n    userTyping (receiverMail: String!): String\n    counter: Counter\n  }\n\n\n";
var _default = type;
exports.default = _default;