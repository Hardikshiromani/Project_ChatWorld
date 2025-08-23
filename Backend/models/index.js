const User = require("./userModel");
const Message = require("./messageModel");
const Chatroom = require("./chatroomModel");
const ChatMembers = require("./chatMembersModel");
const Media =require("./mediaModel");
// Associations
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });

Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

Chatroom.hasMany(Message, { foreignKey: "roomId", as: "messages" });
Message.belongsTo(Chatroom, { foreignKey: "roomId", as: "chatroom" });

// User & Chatroom Relationship (Creator of Group)
User.hasMany(Chatroom, { foreignKey: "createdBy", as: "createdRooms" });
Chatroom.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// Chatroom & ChatMembers Relationship (For Group Chats)
Chatroom.hasMany(ChatMembers, { foreignKey: "roomId", as: "members" });
ChatMembers.belongsTo(Chatroom, { foreignKey: "roomId", as: "chatroom" });

// User & ChatMembers Relationship (Users in a Group)
User.hasMany(ChatMembers, { foreignKey: "userId", as: "chatMemberships" });
ChatMembers.belongsTo(User, { foreignKey: "userId", as: "user" });


// Message ↔ Media
Message.hasMany(Media, { foreignKey: "messageId", as: "mediaFiles" });
Media.belongsTo(Message, { foreignKey: "messageId", as: "message" });

// User ↔ Media
// User.hasMany(Media, { foreignKey: "uploadedBy", as: "uploadedMedia" });
// Media.belongsTo(User, { foreignKey: "uploadedBy", as: "uploader" });

module.exports = {
  User,
  Message,
  Chatroom,
  ChatMembers,
  Media
};
