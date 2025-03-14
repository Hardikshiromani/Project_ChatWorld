const { DataTypes } = require("sequelize");

const db = require("../config/db");

const Users = db.define("user", {
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
   },  {
    tableName: "user",
    timestamps: false,
});
//Associations
Users.associations=(models)=>{
  Users.hasMany(models.MessageChannel,{foreignKey:'senderId', as:'sentMessages'});
  Users.hasMany(models.Message,{foreignKey:'receiverId',as:'recievedMessages'});
}


module.exports = Users;
