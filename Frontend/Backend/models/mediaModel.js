
const { DataTypes } = require("sequelize"); // Importing Sequelize's DataTypes module
const db = require("../db"); // Importing the database connection

// Defining the 'Media' model to store media files associated with messages
const Media = db.define(
  "media",
  {
    // Unique ID for each media entry (Auto-incremented primary key)
    mediaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // ID of the associated message (Optional foreign key)
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // URL of the media file
    mediaURL: {
      type: DataTypes.STRING, // Corrected from VARCHAR to STRING (Sequelize uses STRING)
      allowNull: false,
      // defaultValue: null, // Corrected 'Null' to 'null'
    },

    // Type of file stored (Image, Audio, Video, File)
    mediaType: {
      type: DataTypes.ENUM("image", "audio", "video", "file"),
      allowNull: false,
      defaultValue: null,
    },

    // Timestamp of when the media file was uploaded
    uploadedAt: {
      type: DataTypes.DATE, // Corrected from NOW to DATE (NOW is used for default values)
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    // ID of the user who uploaded the media
    uploadedBy: {
      type: DataTypes.INTEGER, // Corrected type from NOW to INTEGER (NOW is not valid here)
      allowNull: false,
      defaultValue: null,
    },
  },
  {
    tableName: "media", // Specifies the exact table name in the database
    timestamps: false, // Disables automatic timestamps for creation and updates
  }
);

// Exporting the Media model for use elsewhere in the application
module.exports = Media;
