const { User, Message, Chatroom, ChatMembers } = require("../models"); // Fixed model names
const { Op } = require("sequelize");

// Initialize socket.io
let io;

exports.intialiseSocket = (socketio) => {
  io = socketio;

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinRoom", async (data) => {
      const { userId, roomId } = data;

      // if (roomId) {
      //   socket.join(roomId,toString());
      //   console.log(`User ${userId} joined room ${roomId}`);
      // }

      if (userId && roomId) {
        socket.join(roomId.toString());
        console.log(`👤 User ${userId} joined room ${roomId}`);
        console.log(`🔹 Rooms for User ${userId}:`, socket.rooms);
      } else if (userId) {
        socket.join(userId.toString());
        console.log(`✅ User ${userId} joined `);
        console.log(`🔹 Rooms for User ${userId}:`, socket.rooms);
      } else {
        console.error("❌ User ID or Room ID missing in joinRoom event");
      }

      try {
        // Update last seen when user joins
        await User.update(
          { lastseen: new Date() },
          { where: { userid: userId } }
        );
        console.log(`✅ Last seen updated for User ${userId}`);
      } catch (error) {
        console.error("❌ Error updating last seen:", error);
      }
    });

    socket.on("errorMessage",(data)=>{
      console.log("Error Message:", data);
      socket.emit("errorMessage", data);
    })

    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, content, type, roomId } = data;

      try {
        // Save message to DB
        const newMessage = await Message.create({
          senderId,
          receiverId: receiverId || null,
          roomId: roomId || null,
          content,
          type,
        });

        if (roomId) {
          const chatRoom = await Chatroom.findOne({
            where: { roomId },
            
          }
        );
          if (chatRoom.chatType ==="group" && chatRoom.createdBy!==senderId) {
            console.log(`User ${senderId} is not the admin of group ${roomId}`);
            socket.emit("errorMessage", {
              message: "Only admins can send messages in this group",
            });
             return;
            // return res
            //   .status(404)
            //   .json({ message: "User not in  the  chat room" });
          }
          console.log(`📤 Message sent to Room ID: ${roomId}`);
      
          io.to(roomId.toString()).emit("receiveMessage", newMessage); // 🔹 Only Group Chat
        } else if (receiverId) {
          io.to(receiverId.toString()).emit("receiveMessage", newMessage);
          console.log(`📤 Sending message to Receiver ID: ${receiverId}`);
        }
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("markMessageRead", async ({ userId, roomId }) => {
      try {
        await Message.update(
          { isRead: true },
          { where: { receiverId: userId, roomId, isRead: false } }
        );
      } catch (error) {
        console.error("Error marking messages as read:", error);
        // console.log("Marked messages as read for user:", userId);
      }
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
};

// 📩 Send Message API (HTTP request)
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, type, content, roomId } = req.body;

    // Validate request
    if (!senderId || !type || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let chatRoomId = roomId;
     let finalReceiverId = receiverId;



     if(roomId){
    const chatRoom = await Chatroom.findOne({
      where: { roomId }
     });

     if(!chatRoom){
      return res.status(404).json({ message: "Chat room not found" });
     }
     
     if(chatRoom.chatType==="private"){
      
      if (
        !(
          (chatRoom.user1 === senderId && chatRoom.user2 === receiverId) ||
          (chatRoom.user2 === senderId && chatRoom.user1 === receiverId)
        )
      )
{
        return res.status(404).json({ message: "Unauthrized fot this room " });
      }
    }
  }
    // Check if private chat room exists
    if (receiverId) {
      const existingRoom = await Chatroom.findOne({
        where: {
          chatType: "private", // Using chatType instead of isGroup
          [Op.or]: [
            { user1: senderId, user2: receiverId },
            { user1: receiverId, user2: senderId },
          ],
        },
      });

      if (existingRoom) {
        chatRoomId = existingRoom.roomId;
      } else {
        // Create a new private chat room
        const newRoom = await Chatroom.create({
          roomName: `Private Chat ${senderId}-${receiverId}`, // Fixed template string
          chatType: "private",
          user1: senderId,
          user2: receiverId,
          createdBy: senderId, // Assigning creator
        });
        chatRoomId = newRoom.roomId;
      }
    }
    else if(!roomId){
      return res.status(404).json({ message: "Receiver ID  or roomId is required" });
    }

    // Save message
    const newMessage = await Message.create({
      senderId,
      receiverId: receiverId || null,
      roomId: chatRoomId || null,
      content,
      type,
    });

    // Emit message through WebSocket
    if (io) io.emit("receiveMessage", newMessage);

    return res.status(201).json({
      message: "Message Sent Successfully",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};

// 📩 Get Messages API
exports.getMessage = async (req, res) => {
  const {userId} =req.params;
  try {
    
  const membership = await ChatMembers.findAll({
    where:{userId},
    include:[{
      model:Chatroom,
      as: "chatroom",
      attributes:['roomId'],
      where:{
        chatType:'group',
      },
    }]
  });

  const groupRoomIds =membership.map((member)=> member.chatroom?.roomId)
  .filter((id) => id !== undefined && id !== null);


  const  messages = await Message.findAll({
      where: {
        [Op.or]: [
          {senderId: userId},
          {receiverId: userId}, // Private chat
          {roomId: { [Op.in]: groupRoomIds }}, // Group chat
        
        ]
      },
    order: [["sentAt", "ASC"]],
    });
  
    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};
exports.getUnreadMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch unread messages
   const groupMembership = await ChatMembers.findAll({
    where:{userId},
    attributes:["roomId"]
   });
    const groupRoomIds = groupMembership.map((member) => member.roomId)
    .filter((id)=> id!==null);


    const unreadMessages = await Message.findAll({
      where: {
        isRead: false, // Only unread messages
        [Op.or]:[
        {receiverId: userId,},//private 
        {roomId:{ [Op.in]: groupRoomIds}} //group
        ]
      },
      order: [["sentAt", "ASC"]],
    });
const unreadMessageIds = unreadMessages.map((msg) => msg.messageId);
    if (unreadMessageIds.length > 0) {
      // Mark them as read after fetching
      await Message.update(
        { isRead: true },
        { where: { messageId: { [Op.in]: unreadMessageIds } } }
      );
    }
    res.status(200).json({ success: true, messages: unreadMessages });
  } catch (error) {
    console.error("Error fetching unread messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
