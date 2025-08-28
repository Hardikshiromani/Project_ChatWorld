// const User = require("./userModel");
// const Message = require("./messageModel");
// const Chatroom = require("./chatroomModel");
// const ChatMembers = require("./chatMembersModel");
// const Media =require("./mediaModel");
// // Associations
// User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
// User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
// Chatroom.hasMany(Message, { foreignKey: "roomId", as: "messages" });
// Message.belongsTo(Chatroom, { foreignKey: "roomId", as: "chatroom" });

// // User & Chatroom Relationship (Creator of Group)
// User.hasMany(Chatroom,{foreignKey:"createdBy", as: "createdRooms"});
// Chatroom.belongsTo(User,{foreignKey:"createdBy", as: "creator"});
// // User.hasMany(Chatroom, { foreignKey: "createdBy", as: "createdRooms" });
// // Chatroom.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// // Chatroom & ChatMembers Relationship (For Group Chats)
// Chatroom.hasMany(ChatMembers,{ foreignKey:"roomId",as:"members"});
// ChatMembers.belongsTo(Chatroom,{ foreignKey:"roomId", as:"chatroom"});

// Chatroom.hasMany(ChatMembers, { foreignKey: "roomId", as: "members" });
// ChatMembers.belongsTo(Chatroom, { foreignKey: "roomId", as: "chatroom" });

// // User & ChatMembers Relationship (Users in a Group)
// User.hasMany(ChatMembers, { foreignKey: "userId", as: "chatMemberships" });
// ChatMembers.belongsTo(User, { foreignKey: "userId", as: "user" });


// // Message ↔ Media
// Message.hasMany(Media, { foreignKey: "messageId", as: "mediaFiles" });
// Media.belongsTo(Message, { foreignKey: "messageId", as: "message" });

// // User.hasMany(Chatroom, { foreignKey: "createdBy", as: "createdRooms" });
// // User ↔ Media
// // User.hasMany(Media, { foreignKey: "uploadedBy", as: "uploadedMedia" });
// // Media.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

// module.exports = {
  
//   User,
//   Message,
//   Chatroom,
//   ChatMembers,
//   Media
// };

const User = require("./userModel");
const Message = require("./messageModel");
const Chatroom = require("./chatroomModel");
const ChatMembers = require("./chatMembersModel");
const Media = require("./mediaModel");

// ---------------- Associations ---------------- //

// User ↔ Messages
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });
Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

// Chatroom ↔ Messages
Chatroom.hasMany(Message, { foreignKey: "roomId", as: "messages" });
Message.belongsTo(Chatroom, { foreignKey: "roomId", as: "chatroom" });

// User ↔ Chatroom (Creator of group)
User.hasMany(Chatroom, { foreignKey: "createdBy", as: "createdRooms" });
Chatroom.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// Chatroom ↔ ChatMembers (Users inside a group)
Chatroom.hasMany(ChatMembers, { foreignKey: "roomId", as: "members" });
ChatMembers.belongsTo(Chatroom, { foreignKey: "roomId", as: "chatroomMembers" });

// User ↔ ChatMembers
User.hasMany(ChatMembers, { foreignKey: "userId", as: "chatMemberships" });
ChatMembers.belongsTo(User, { foreignKey: "userId", as: "member" });

// Message ↔ Media
Message.hasMany(Media, { foreignKey: "messageId", as: "mediaFiles" });
Media.belongsTo(Message, { foreignKey: "messageId", as: "message" });

// Optional: User ↔ Media (if you need uploaded files tracking)
// User.hasMany(Media, { foreignKey: "uploadedBy", as: "uploadedMedia" });
// Media.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

// ---------------- Export ---------------- //
module.exports = {
  User,
  Message,
  Chatroom,
  ChatMembers,
  Media,
};
