const { DataTypes } = require("sequelize"); // Importing Sequelize's DataTypes module
const db = require("../db"); // Importing the database connection

// Defining the 'chats' model for managing chat rooms and their metadata
const chats = db.define(
  "chats",
  {
    // Unique chat ID (Auto-incremented primary key)
    chatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: null,
    },

    // ID of the associated chatroom (Foreign key referencing 'messages')
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      references: {
        model: "messages", // Corrected 'messsages' typo to 'messages'
        key: "messageId", // References 'messageId' column in 'messages' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when associated messages are deleted
    },

    // ID of the last message sent in the chat (Optional)
    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    // Timestamp of the last message sent in the chat (Optional)
    lastMessageTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },

    // Count of unread messages in the chat
    unreadcount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "chatstable", // Specifies the exact table name in the database
    timestamps: false, // Disables automatic timestamps for creation and updates
  }
);

// Exporting the chats model for use elsewhere in the application
module.exports = chats;