const {DataTypes} = require('sequelize');
const db = require('../db');

const ChatMembers=db.define("ChatMembers",{
    memberId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    userId:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        references:{
            model:"User",
            key:"userid",
        },
        onDelete:"CASCADE",
    },
    joinedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    role:{
        type:DataTypes.ENUM("admin","member"),
        allowNull:false,
        defaultValue:"member",
    },
    roomId:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:true,
        references:{
            model:"chatroom",
            key:"roomid",
        },
        onDelete:"CASCADE",
    }
},    {
        tableName:"chatmembers",
        timestamps:false,
    
})

module.exports= ChatMembers;