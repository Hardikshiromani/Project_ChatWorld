const express = require("express");
const router1 = express.Router(); // Initialize Express router

// Import necessary controllers
const { getChatlist, privateMessages } = require("../controllers/msgcontroller");
const { getMessage, sendMessage, getUnreadMessages, intialiseSocket } = require("../controllers/chatController");
const { createGroup, updateGroup, getGroupdetails, deleteGroup } = require("../controllers/groupController");
const { authenticateToken } = require("../middleware/AuthenicationToken");
const chatController = require("../controllers/chatController");

// **Messaging Routes**

// Send a new message (Requires authentication)
router1.post("/sendmessage", authenticateToken, sendMessage);

// Initialize socket connection
router1.get("/initialiseSocket", intialiseSocket);

// **Group Management Routes**

// Delete a chat group by room ID
router1.delete("/deleteGroup/:roomId", deleteGroup);

// Get details of a specific chat group by room name
router1.get("/getGroupdetails/:roomName", getGroupdetails);

// Update chat group details using room ID
router1.patch("/updateGroup/:roomId", updateGroup);

// Create a new chat group
router1.post("/createGroup", createGroup);

// **Message Retrieval Routes**

// Fetch messages for a specific user
router1.get("/getmessage/:userId", getMessage);

// Retrieve list of all chat conversations
router1.get("/chatlist", getChatlist);

// Fetch private messages between users
router1.get("/privateMsg", privateMessages);

// Retrieve unread messages for a specific user
router1.get("/getUnreadMessages/:userId", getUnreadMessages);

// Export router configuration
module.exports = router1;