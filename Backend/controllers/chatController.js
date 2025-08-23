
const { User, Message, Chatroom, ChatMembers } = require("../models"); // Import models
const { Op } = require("sequelize"); // Import Sequelize operators for querying
const { sendPushNotification } = require("../routes/utils/sendNotifications"); // Import notification function

// **Initialize Socket.IO**
let io;
const onlineUsers = new Map(); // Stores active users (userId => socket.id)

// **Initialize Socket.IO and Manage Connections**
exports.intialiseSocket = (socketio) => {
  io = socketio;

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    // **Handle User Joining Room**
    socket.on("joinRoom", async (data) => {
      const { userId, roomId } = data;

      // Store user as online
      if (userId) {
        onlineUsers.set(userId.toString(), socket.id);
        console.log("✅ Added user to onlineUsers:", onlineUsers);
      }

      // Join group or private chat room
      if (userId && roomId) {
        socket.join(roomId.toString());
        console.log(`👤 User ${userId} joined room ${roomId}`);
        console.log(`🔹 Rooms for User ${userId}:`, socket.rooms);
      } else if (userId) {
        socket.join(userId.toString());
        console.log(`✅ User ${userId} joined`);
        console.log(`🔹 Rooms for User ${userId}:`, socket.rooms);
      } else {
        console.error("❌ User ID or Room ID missing in joinRoom event");
      }

      // Update user's last seen time in database
      try {
        await User.update(
          { lastseen: new Date() },
          { where: { userid: userId } }
        );
        console.log(`✅ Last seen updated for User ${userId}`);
      } catch (error) {
        console.error("❌ Error updating last seen:", error);
      }
    });

    // **Error Handling**
    socket.on("errorMessage", (data) => {
      console.log("Error Message:", data);
      socket.emit("errorMessage", data);
    });

    // **Handle Sending Messages**
    socket.on("sendMessage", async (data) => {
      const { senderId, receiverId, content, type, roomId } = data;

      try {
        // Save message to database
        const newMessage = await Message.create({
          senderId,
          receiverId: receiverId || null,
          roomId: roomId || null,
          content,
          type,
        });

        // **Emit Message to Online Users**
        const receiverSocket = onlineUsers.get(receiverId?.toString());
        if (receiverSocket) {
          io.to(receiverSocket).emit("receiveMessage", newMessage);
        } else {
          // **User is offline → Send push notification**
          const receiver = await User.findOne({ where: { userid: receiverId } });
          const sender = await User.findOne({ where: { userid: senderId } });

          if (receiver?.fcmtoken) {
            await sendPushNotification(
              receiver.fcmtoken,
              "New Message",
              `${sender?.username || "Someone"} sent you a message`
            );
          }
        }

        // **Group Chat Handling**
        if (roomId) {
          const chatRoom = await Chatroom.findOne({ where: { roomId } });

          // Restrict non-admins from sending messages in admin-only groups
          if (chatRoom.chatType === "group" && chatRoom.createdBy !== senderId) {
            console.log(`User ${senderId} is not the admin of group ${roomId}`);
            socket.emit("errorMessage", {
              message: "Only admins can send messages in this group",
            });
            return;
          }

          console.log(`📤 Message sent to Room ID: ${roomId}`);
          io.to(roomId.toString()).emit("receiveMessage", newMessage);
        } else if (receiverId) {
          io.to(receiverId.toString()).emit("receiveMessage", newMessage);
          console.log(`📤 Sending message to Receiver ID: ${receiverId}`);
        }
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    // **Mark Messages as Read**
    socket.on("markMessageRead", async ({ userId, roomId }) => {
      try {
        await Message.update(
          { isRead: true },
          { where: { receiverId: userId, roomId, isRead: false } }
        );
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    });

    // **Handle User Disconnection**
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          console.log(`🚪 User ${userId} went offline`);
          break;
        }
      }
      console.log("User Disconnected:", socket.id);
    });
  });
};
exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, type, content, roomId } = req.body;

    // **Validate request fields**
    if (!senderId || !type || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let chatRoomId = roomId;
    let finalReceiverId = receiverId;

    // **Check if chat room exists**
    if (roomId) {
      const chatRoom = await Chatroom.findOne({ where: { roomId } });

      if (!chatRoom) {
        return res.status(404).json({ message: "Chat room not found" });
      }

      if (chatRoom.chatType === "private") {
        // **Ensure sender & receiver belong to the private room**
        if (
          !(
            (chatRoom.user1 === senderId && chatRoom.user2 === receiverId) ||
            (chatRoom.user2 === senderId && chatRoom.user1 === receiverId)
          )
        ) {
          return res.status(403).json({ message: "Unauthorized for this room" });
        }
      }
    }

    // **Check if private chat room exists**
    if (receiverId) {
      const existingRoom = await Chatroom.findOne({
        where: {
          chatType: "private",
          [Op.or]: [
            { user1: senderId, user2: receiverId },
            { user1: receiverId, user2: senderId },
          ],
        },
      });

      if (existingRoom) {
        chatRoomId = existingRoom.roomId;
      } else {
        // **Create a new private chat room if none exists**
        const newRoom = await Chatroom.create({
          roomName: `Private Chat ${senderId}-${receiverId}`,
          chatType: "private",
          user1: senderId,
          user2: receiverId,
          createdBy: senderId,
        });
        chatRoomId = newRoom.roomId;
      }
    } else if (!roomId) {
      return res.status(400).json({ message: "Receiver ID or room ID is required" });
    }

    // **Save the message in the database**
    const newMessage = await Message.create({
      senderId,
      receiverId: receiverId || null,
      roomId: chatRoomId || null,
      content,
      type,
    });

    // **Send push notification if receiver is offline**
    if (receiverId) {
      const receiver = await User.findOne({ where: { userid: receiverId } });
      const sender = await User.findOne({ where: { userid: senderId } });

      if (receiver?.fcmToken) {
        await sendPushNotification(
          receiver.fcmToken,
          "New Message",
          `${sender?.username || "Someone"} sent you a message`
        );
      }
    }

    // **Emit message to receiver if online**
    if (receiverId) {
      const socketId = onlineUsers.get(receiverId.toString());
      if (socketId) {
        io.to(socketId).emit("receiveMessage", newMessage);
      }
    }

    return res.status(201).json({ message: newMessage.content, data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
};
exports.getMessage = async (req, res) => {
  const { userId } = req.params;
  try {
    // **Find group memberships for the user**
    const membership = await ChatMembers.findAll({
      where: { userId },
      include: [{
        model: Chatroom,
        as: "chatroom",
        attributes: ["roomId"],
        where: { chatType: "group" },
      }],
    });

    // **Extract group room IDs**
    const groupRoomIds = membership.map((member) => member.chatroom?.roomId)
      .filter((id) => id !== undefined && id !== null);

    // **Fetch messages (private & group)**
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId }, // Messages sent by user
          { receiverId: userId }, // Messages received by user
          { roomId: { [Op.in]: groupRoomIds } }, // Group messages
        ],
      },
      order: [["sentAt", "ASC"]], // Sort messages by timestamp
    });

    res.status(200).json({ success: true, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

exports.getUnreadMessages = async (req, res) => {
  const { userId } = req.params;

  console.log("Requested userId:", userId);

  try {
    // **Find group room IDs where user is a member**
    const groupMembership = await ChatMembers.findAll({
      where: { userId },
      attributes: ["roomId"],
    });

    const groupRoomIds = groupMembership
      .map((member) => member.roomId)
      .filter((id) => id !== null);

    // **Fetch messages (unread & read), prioritizing unread first**
    const allMessages = await Message.findAll({
      where: {
        [Op.or]: [
          { receiverId: userId }, // Private messages sent to user
          { senderId: userId }, // Messages sent by user
          { roomId: { [Op.in]: groupRoomIds } }, // Group messages
        ],
      },
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["userId", "username", "profilePhoto"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["userId", "username", "profilePhoto"],
        },
        {
          model: Chatroom,
          as: "chatroom",
          attributes: ["roomId", "roomName"],
        },
      ],
      order: [
        ["isRead", "ASC"], // Prioritize unread messages
        ["sentAt", "ASC"], // Sort older messages first
      ],
    });

    // **Get IDs of unread messages**
    const unreadMessageIds = allMessages
      .filter((msg) => msg.isRead === 0) // Filter unread messages
      .map((msg) => msg.messageId);

    // **Mark unread messages as read**
    if (unreadMessageIds.length > 0) {
      await Message.update(
        { isRead: true },
        { where: { messageId: { [Op.in]: unreadMessageIds } } }
      );
    }

    res.status(200).json({ success: true, messages: allMessages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};