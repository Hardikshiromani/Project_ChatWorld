const { DataTypes } = require("sequelize");

const db = require("../db");

const User = db.define("user", {
  userid: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: { 
    type: DataTypes.STRING(255),
    allowNull: false,
   },
   bio:{
    type:DataTypes.TEXT,
    allowNull: true,
   },
   DOB:{
    type:DataTypes.DATE,
    allowNull: true,
   },
   phoneNumber:{
    type:DataTypes.STRING(20),
    allowNull: true,
   },
   lastseen: {
    type: DataTypes.DATE,       // Sequelize's format
    field: 'lastseen',          // Match column name in DB
    allowNull: true,
  }
   },  {
    tableName: "user",
    timestamps: false,
});


module.exports = User;
