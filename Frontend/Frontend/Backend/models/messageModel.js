
const sequelize = require("sequelize"); // Importing Sequelize library
const db = require("../db"); // Importing the database connection
const DataTypes = sequelize.DataTypes; // Extracting Sequelize's built-in data types

// Defining the 'Messages' model for storing user messages
const Messages = db.define(
  "message",
  {
    // Unique ID for each message (auto-incremented primary key)
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // ID of the user sending the message (Foreign key referencing 'user' table)
    senderId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: "user", // References the 'user' table
        key: "userid", // Maps to the 'userid' column in 'user' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when user is removed
    },

    // ID of the user receiving the message (Foreign key referencing 'user' table)
    receiverId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: "user", // References the 'user' table
        key: "userid", // Maps to the 'userid' column in 'user' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when user is removed
    },

    // Content of the message (text format)
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Message must have content
    },

    // Timestamp of when the message was sent (Defaults to current time)
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Automatically sets the time when a message is created
    },

    // Boolean flag to indicate if the message has been read
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Defaults to 'false' (message is unread)
    },

    // Type of message content (Supports different media formats)
    type: {
      type: DataTypes.ENUM("text", "image", "video", "audio"), // Restricts type to predefined values
      allowNull: false,
    },

    // ID of the chatroom where the message was sent (Optional foreign key)
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "chatroom", // References the 'chatroom' table
        key: "roomId", // Maps to the 'roomId' column in 'chatroom' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when chatroom is removed
    },
  },
  {
    tableName: "message", // Specifies the exact table name in the database
    createdAt: false, // Disables automatic timestamping for creation
    updatedAt: false, // Disables automatic timestamping for updates
  }
);

module.exports = Messages; // Exporting the model for use in other parts of the application