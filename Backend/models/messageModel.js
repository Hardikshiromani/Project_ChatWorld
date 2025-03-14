const {DataTypes, Sequelize, Model} = require("sequelize");

const Message= Sequelize.define("message",{
    messageId:{
    type:DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    },
    senderId:{
        type:DataTypes.BIGINT.UNSIGNED,
        allowNull:true,
        reference:{
            Model:'user',
            key:'userId',
        },
        onDelete:'CASCADE',
    },
    recieverId:{
        type:DataTypes.BIGINT.UNSIGNED,
        allowNull:true,
        reference:{
            Model:'user',
            key:'userId',
        },
        onDelete:'CASCADE',
    },
    content :{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    sentAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    isRead:{
        type:DataTypes.TINYINT(1),
            allowNull:true,
            defaultValue:DataTypes.NOW,
    },

    type:{
        type:DataTypes.STRING(10),
        allowNull: true,
    },
    roomId:{
        type:DataTypes.BIGINT.UNSIGNED,
        allowNull:true,
    },
},
{
    tableName: 'message',
    timestamps: false,
});

Message.associate = (models) => {
    Message.belongsTo(models.User, { foreignKey: "senderId", as: "sender" });
    Message.belongsTo(models.User, { foreignKey: "receiverId", as: "receiver" });
  };

  module.exports=Message;

