const { DataTypes } = require("sequelize"); // Importing Sequelize's DataTypes module
const db = require("../db"); // Importing the database connection

// Defining the 'Status' model for user-generated status updates
const status = db.define(
  "status",
  {
    // Unique ID for each status entry (Auto-incremented primary key)
    statusId: {
      type: DataTypes.INTEGER, // Fixed typo ('Datatypes' to 'DataTypes')
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    // ID of the user who posted the status (Foreign key referencing 'user' table)
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user", // References the 'user' table
        key: "userId", // Maps to the 'userId' column in 'user' table
      },
      onDelete: "CASCADE", // Ensures cascading deletion when user is removed
    },

    // Content of the status update
    content: {
      type: DataTypes.TEXT,
      allowNull: false, // Status must have content
    },

    // Timestamp when the status was created
    createdAt: {
      type: DataTypes.DATE, // Fixed 'TIMESTAMP' to 'DATE' (Sequelize uses DATE type)
      allowNull: false,
      defaultValue: DataTypes.NOW, // Sets default timestamp to current time
    },

    // Timestamp when the status expires
    expiresAt: {
      type: DataTypes.DATE, // Fixed 'TIMESTAMP' to 'DATE' (Sequelize uses DATE type)
      allowNull: false,
      defaultValue: null,
    },
  },
  {
    tableName: "status", // Specifies the exact table name in the database
    timestamps: false, // Disables automatic timestamping for creation and updates
  }
);

module.exports = status; // Exporting the model for use elsewhere in the application