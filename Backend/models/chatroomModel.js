const sequelize = require('sequelize');
const db= require('../db');
const DataTypes = sequelize.DataTypes;

const Chatroom= db.define('chatroom',{
  roomId:{
    type:DataTypes.INTEGER.UNSIGNED,
    autoIncrement:true,
    primaryKey:true,
  },
  roomName:{
    type:DataTypes.STRING(255),
    allowNull:false,
  },
  chatType:{
    type:DataTypes.ENUM('private','group'),
    allowNull:false,
  },
  createdAt:{
    type:DataTypes.DATE,
    // allowNull:false,
    defaultValue: DataTypes.NOW,
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:true,
  },
  createdBy:{
    type:DataTypes.INTEGER.UNSIGNED,
    allowNull:false,
    references:{
      model:'user',
      key:'userid',
    },
    onDelete:'CASCADE',
  },
  user1:{
    type:DataTypes.INTEGER.UNSIGNED,
    allowNull:true,
    references:{
      model:'user',
      key:'userid',
    },
    onDelete:'CASCADE',
  },
  user2:{
    type:DataTypes.INTEGER.UNSIGNED,
    allowNull:true,
    references:{
      model:'user',
      key:'userid',
    },
    onDelete:'CASCADE',
  }
},{
    tableName:'chatroom',
    createdAt:true,
    updatedAt:false,
  });

module.exports=Chatroom;