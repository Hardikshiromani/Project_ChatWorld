const express = require("express");
const router1 = express.Router();
const { getChatlist ,privateMessages } = require('../controllers/msgcontroller');
const {sendMessage,getMessage,getUnreadMessages}= require('../controllers/chatController');
const {createGroup,updateGroup, getGroupdetails, deleteGroup}= require('../controllers/groupController');
//send a new message
router1.post("/sendmessage", sendMessage);
//get all messages
router1.delete("/deleteGroup/:roomId",deleteGroup);
router1.get("/getGroupdetails/:roomName",getGroupdetails)
router1.patch("/updateGroup/:roomId", updateGroup);
router1.post("/createGroup", createGroup);
router1.get("/getmessage/:userId", getMessage);
router1.get('/chatlist', getChatlist);
router1.get("/privateMsg", privateMessages);
router1.get("/getUnreadMessages/:userId", getUnreadMessages);
//get all messages in a chatroom
module.exports = router1;