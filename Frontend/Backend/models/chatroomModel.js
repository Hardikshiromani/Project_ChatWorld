const sequelize = require("sequelize"); // Importing Sequelize library
const db = require("../db"); // Importing the database connection
const DataTypes = sequelize.DataTypes; // Extracting Sequelize's built-in data types

// Defining the 'Chatroom' model to manage chat rooms
const Chatroom = db.define(
  "chatroom",
  {
    // Unique ID for each chatroom (Auto-incremented primary key)
    roomId: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    // Name of the chatroom
    roomName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // Type of chat (Either "private" or "group")
    chatType: {
      type: DataTypes.ENUM("private", "group"),
      allowNull: false,
    },

    // Timestamp when the chatroom was created
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets current timestamp
    },

    // Optional description of the chatroom
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // ID of the user who created the chatroom (Foreign key referencing 'user' table)
    createdBy: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: "user", // References the 'user' table
        key: "userid", // Maps to the 'userid' column in 'user' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when user is removed
    },

    // ID of one of the users in a private chat (Foreign key referencing 'user' table)
    user1: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "user",
        key: "userid",
      },
      onDelete: "CASCADE",
    },

    // ID of the second user in a private chat (Foreign key referencing 'user' table)
    user2: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "user",
        key: "userid",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "chatroom", // Specifies the exact table name in the database
    createdAt: true, // Enables automatic timestamping for creation
    updatedAt: false, // Disables automatic timestamping for updates
  }
);

module.exports = Chatroom; // Exporting the model for use elsewhere in the application