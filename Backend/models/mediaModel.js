const {DataTypes} = require('sequelize');
const db = require('../db');

const Media= db.define("media",{
     mediaId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
     },
     messageId:{
        type:DataTypes.INTEGER,
        allowNull:true
     },
     mediaURL:{
        type:DataTypes.VARCHAR,
        allowNull:false,
        defaultValue:Null
     },
     Filesize:{
        type:DataTypes.ENUM('image','audio','video','file'),
        allowNull:false,
        defaultValue:null,
     },
     uploadedAt:{
        type:DataTypes.NOW,
        allowNull:false,
        defaultValue:null,
     },
     uploadedBy:{
        type:DataTypes.NOW,
        allowNull:false,
        defaultValue:null,
     },
    },{
        tableName:"media",
        timestamps:false,
    })