const DataTypes = require("sequelize");
const db = require("../db");

const chats = db.define("chats", {
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    defaultValue: null,
  },
  roomId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    default: null,
    references: {
      model: "messsages",
      key: "messageId",
    },
    onDelete: "CASCADE",
  },
  lastMessageId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },

  lastMessageTime: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  unreadcount:{
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
  },
},{
   tableName: "chatstable",
   timestamps: false,
});
module.exports= chats;