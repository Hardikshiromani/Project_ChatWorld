const sequelize = require('sequelize');
const db= require('../db');
const DataTypes = sequelize.DataTypes;

const Messages= db.define('message',{
   messageId:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,    
   },
   senderId:{
    type:DataTypes.BIGINT.UNSIGNED,
    allowNull:false,

    references:{
        model:'user',
        key:"userid",
    },
    onDelete:'CASCADE',
   },
   receiverId:{
    type:DataTypes.BIGINT.UNSIGNED,
    allowNull:true,

    references:{
        model:'user',
        key:"userid",
    },
    onDelete:'CASCADE',
   },
   content:{
    type:DataTypes.TEXT,
    allowNull:false,

   },
   sentAt:{
    type: DataTypes.DATE,
    allowNull:false,
    defaultValue: DataTypes.NOW,
   },
   isRead:{
    type:DataTypes.BOOLEAN,
    defaultValue:false,
   },
   type:{
    type:DataTypes.ENUM('text','image','video','audio'),
    allowNull:false,
   },
   roomId:{
    type:DataTypes.INTEGER.UNSIGNED,
    allowNull:true,
    references:{
        model:'chatroom',
        key:'roomId',
    },
    onDelete:'CASCADE',
  },
},
{
    tableName: "message",
   createdAt: false,
   updatedAt:false,
})

module.exports=Messages;




