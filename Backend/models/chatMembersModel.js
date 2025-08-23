
const { DataTypes } = require("sequelize"); // Import Sequelize's DataTypes module
const db = require("../db"); // Import database connection

// Define 'ChatMembers' model to manage group chat members
const ChatMembers = db.define(
  "ChatMembers",
  {
    // Unique ID for each chat member (Auto-incremented primary key)
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    // Optional description for the chat member
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // User ID of the chat member (Foreign key referencing 'User' table)
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "User", // References the 'User' table
        key: "userid", // Maps to the 'userid' column in 'User' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when user is removed
    },

    // Timestamp when the user joined the chat room
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically sets the join date
    },

    // Role of the chat member (Admin or Member)
    role: {
      type: DataTypes.ENUM("admin", "member"),
      allowNull: false,
      defaultValue: "member", // Defaults to 'member' unless specified as 'admin'
    },

    // Chat room ID (Foreign key referencing 'chatroom' table)
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "chatroom", // References the 'chatroom' table
        key: "roomid", // Maps to the 'roomid' column in 'chatroom' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when the chatroom is removed
    },

    // ID of the last read message by this member (Tracks read status)
    lastReadMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null, // Null if no message has been read yet
    },

    // Flag to indicate whether the chat is pinned
    isPinned: {
      type: DataTypes.TINYINT(1), // Uses 1 (true) or 0 (false) for pinning
      allowNull: true,
      defaultValue: 0, // Defaults to unpinned (0)
    },

    // Timestamp when the user left or was removed from the chat room
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // Null if the user is still active in the chat
    },

    // Timestamp of the last time the user was active in the chat
    lastSeenAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null, // Tracks last seen status
    },
  },
  {
    tableName: "chatmembers", // Specifies the exact table name in the database
    timestamps: false, // Disables automatic timestamping for creation and updates
  }
);

// Exporting the model for use elsewhere in the application
module.exports = ChatMembers;