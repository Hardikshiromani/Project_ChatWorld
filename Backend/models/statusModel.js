const { Datatypes } = require("sequelize");
const db= require("../db");


const status= db.define("status", {
  statusId:{
    type:Datatypes.INTEGER,
    allowNull:false,
    autoIncrement:true,
  },
    userId:{
        type:Datatypes.INTEGER,
        allowNull:false,
        references:{
        model:"user",
        key:"userId",
        },
        onDelete:"CASCADE",
    },
  content:{
    type:Datatypes.TEXT,
    allowNull:false,
  },
  createdAt:{
    type:Datatypes.TIMESTAMP,
    allowNull:false,
    defaultValue:Datatypes.NOW,
  },
    expiresAt:{
        type:Datatypes.TIMESTAMP,
        allowNull:false,
        defaultValue:null,
    },
},{
  tableName:"status",
  timestamps:false,
});

module.exports= status;