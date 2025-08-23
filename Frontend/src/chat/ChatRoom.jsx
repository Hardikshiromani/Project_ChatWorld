import React, { useState, useEffect } from "react";
import { MdCall } from "react-icons/md"; // Import call icon
import { BsEmojiSmile } from "react-icons/bs"; // Import emoji icon
import { FaVideo } from "react-icons/fa"; // Import video call icon
import { BsThreeDotsVertical } from "react-icons/bs"; // Import settings menu icon
import { AiOutlineUser } from "react-icons/ai"; // Import user profile icon
import ChatInput from "./chatInput"; // Import chat input component
import socket from "../socket"; // Import WebSocket instance
import pic1 from "../assets/pic1.png"; // Default profile picture

// ChatRoom component for handling individual/group chat sessions
const ChatRoom = ({ selectedChat, chats, setShowProfile,handleNewChat }) => {
  // State variables to manage messages and input
  const [messages, setMessages] = useState([]); // Stores chat messages
  const [newMessage, setNewMessage] = useState(""); // Stores new message input
  const [hoverIcon, setHoveredIcon] = useState(null); // Stores hovered icon for styling

  // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token"); // Retrieve auth token

  let   loggedInUserId= user.id;
  // Determine the receiver ID based on sender/receiver context

const getReceiverId = (chat, loggedInUserId) => {
  if (!chat || chat?.isGroup) return null;

  const realReceiverId =
    chat?.receiver?.id ?? chat?.receiver?.userid ?? chat?.receiverId;
  const realSenderId =
    chat?.sender?.id ?? chat?.sender?.userid ?? chat?.senderId;

  if (realReceiverId && realReceiverId !== loggedInUserId) return realReceiverId;
  if (realSenderId && realSenderId !== loggedInUserId) return realSenderId;

  return null;
};

const receiverId = getReceiverId(selectedChat, loggedInUserId);


  // Determine the chat room ID if it's a group chat
  const roomId = selectedChat?.isGroup && selectedChat?.roomId ? +selectedChat.roomId : null;

  // Define styling for interactive icons
  const iconStyle = (iconName) => ({
    fontSize: "20px",
    cursor: "pointer",
    color: hoverIcon === iconName ? "#007bff" : "#333",
    transition: "color 0.1s",
  });

  // Display a message when no chat is selected
  if (!selectedChat || Object.keys(selectedChat).length === 0) {
    return (
      <div style={styles.container}>
        <center>
          <h3>Select a chat to start messaging</h3>
        </center>
      </div>
    );
  }

  // Join the appropriate chat room when selectedChat changes
  useEffect(() => {
    if (!selectedChat) return;

    if (selectedChat.roomId) {
      // Join group chat room
      socket.emit("joinRoom", {
        userId: user.id.toString(),
        roomId: selectedChat.roomId.toString(),
      });
    } else {
      // Join direct message chat room
      const dmRoom = [user.id, receiverId].sort().join("_");
      socket.emit("joinRoom", {
        userId: user.id.toString(),
        roomId: dmRoom,
      });
    }
  }, [selectedChat]);

   
  // Function to send messages
  const sendMessage = async () => {
    if (newMessage.trim() === "") return; // Prevent empty messages

    const messagePayload = {
      senderId: +user.id,
      receiverId,
      content: newMessage,
      type: "text",
      roomId,
    };

    // console.log("payload",messagePayload);
    try {
      const res = await fetch("http://localhost:5000/api/chat/sendmessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include authentication token
        },
        body: JSON.stringify(messagePayload),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Server error:", data);
        return;
      }

      // Format new message
      const sentAt = data.sentAt || new Date().toISOString();
      const newMsg = {
        sender: "You",
        text: data.message,
        timestamp: new Date(sentAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        sentAt:sentAt,
      };

      setMessages((prevMessages) => [...prevMessages, newMsg]);

      setNewMessage(""); // Clear input
     
       handleNewChat(data); // 👈 Call from props or context
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Listen for incoming messages via WebSocket
  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          sender: msg.senderId === user.id ? "You" : msg.senderName || "Friend",
          text: msg.content,
          timestamp: new Date(msg.sentAt || Date.now()).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        },
      ]);
    });

    return () => {
      socket.off("receiveMessage"); // Cleanup event listener
    };
  }, [roomId, receiverId, user.id]);

  // Retrieve chat messages based on selected conversation
  useEffect(() => {
    if (selectedChat && chats.length > 0 && user) {
      let filteredMessages = [];

      if (selectedChat.roomId) {
        // Group chat messages
        filteredMessages = chats.filter((chat) => chat.roomId === selectedChat.roomId);
      } else {
        // Direct messages
        filteredMessages = chats.filter((chat) => {
          const id1 = Math.min(chat.senderId, chat.receiverId);
          const id2 = Math.max(chat.senderId, chat.receiverId);
          const selectedId1 = Math.min(user.id, receiverId);
          const selectedId2 = Math.max(user.id, receiverId);
          return `dm-${id1}-${id2}` === `dm-${selectedId1}-${selectedId2}`;
        });
      }

      // Sort messages by timestamp
      const sorted = [...filteredMessages].sort((a, b) => new Date(a.sentAt) - new Date(b.sentAt));

      // Format messages for display
      const formattedMessages = sorted.map((chat) => ({
        sender: chat.senderId === user.id ? "You" : chat.sender?.username,
        text: chat.content,
        sentAt: chat.sentAt,
        timestamp: new Date(chat.sentAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      }));

      setMessages(formattedMessages);
  }
    
  }, [selectedChat]);


  const getProfilePhoto = (selectedChat) => {
    if (selectedChat.receiverId === null) {
      return selectedChat.chatroom?.profilePhoto
        ? `http://localhost:5000${selectedChat.chatroom.profilePhoto}`
        : pic1;
    }

    return selectedChat.senderId === user.id
      ? selectedChat.sender?.profilePhoto
        ? `http://localhost:5000${selectedChat.receiver.profilePhoto}`
        : pic1
      : selectedChat.receiver?.profilePhoto
      ? `http://localhost:5000${selectedChat.sender.profilePhoto}`
      : pic1;
  };


const getOtherUser = (chat, loggedInUserId) => {
  if (!chat || chat.isGroup) return null;

  const senderId = chat?.sender?.id ?? chat?.sender?.userid ?? chat?.senderId;
  const receiverId = chat?.receiver?.id ?? chat?.receiver?.userid ?? chat?.receiverId;

  // Check if sender is the logged-in user
  if (senderId === loggedInUserId) {
    return chat.receiver || null;
  }

  // Otherwise, return sender
  return chat.sender || null;
};
// console.log(getOtherUser);
  return (
    <div style={styles.container}>
      {/* Chat Header */}
      <div style={styles.header}>
        <img src={getProfilePhoto(selectedChat)} alt="Profile" style={styles.profilePic} />
        <div style={styles.nameStatus}>
          <h3 style={styles.name}>{getOtherUser(selectedChat, loggedInUserId)?.username}</h3>
          <p style={styles.status}>Online</p>
        </div>
        <div style={styles.icons}>
          <AiOutlineUser style={iconStyle("user")} onClick={() => setShowProfile(true)} />
          <FaVideo style={iconStyle("video")} />
          <MdCall style={iconStyle("call")} />
          <BsThreeDotsVertical style={iconStyle("dots")} />
        </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatArea}>
        {messages.map((msg, idx) => (
          <div key={idx} style={styles.messageContainer(msg.sender === "You")}>
            <div style={styles.messageBubble(msg.sender === "You")}>
              <p style={styles.messageText}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
              <small style={styles.timestamp}>{msg.timestamp}</small>
            </div>
          </div>
        ))}
      </div>

      <ChatInput newMessage={newMessage} setNewMessage={setNewMessage} sendMessage={sendMessage} />
    </div>
  );
};

// Stylingme
const styles = {
  messageContainer: (isSender) => ({
    display: "flex",
    justifyContent: isSender ? "flex-end" : "flex-start", // Align right if sent by user
    margin: "5px 0",
  }),
  messageBubble: (isSender) => ({
    background: isSender
      ? "linear-gradient(to right, #56ccf2, #2f80ed)"
      : "linear-gradient(to right,rgb(33, 255, 185), rgb(0, 255, 128))",
    padding: "8px 12px",
    borderRadius: "9px",
    width: "fit-content",
    maxWidth: "30%", // Ensures long messages wrap properly
    wordWrap: "break-word",
    alignSelf: isSender ? "flex-end" : "flex-start",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  }),
  container: {
    flex: 1,
     display: "flex",
    flexDirection: "column",
    background: "#f9f9f9",
     height: "100vh", // fill the whole screen
    padding: "10px",
    minHeight: "660px",
    marginLeft: "10px",
  },
  timestamp: {
    fontSize: "10px",
    color: "#eee",
    marginTop: "4px",
    alignSelf: "flex-end",
  },
  icons: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "auto",
    gap: "20px",
  },
  timestamp: {
    fontSize: "10px",
    color: "#eee",
    marginTop: "4px",
    alignSelf: "flex-end",
  },

   dateHeader: {
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#555",
    padding: "5px 0",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#e0e0e0",
    margin: "10px 0",
    borderRadius: "5px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    //  flexShrink: 0, // never shrink
  },

  nameStatus: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
    lineHeight: "1",
  },

  name: {
    margin: "0",
    padding: "0",
  },
  status: {
    fontSize: "12px",
    color: "green",
    fontWeight: "bold",
    margin: "0",
    padding: "0", // closer to name
  },

  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  chatArea: {
    // marginTop: "20px",
    // minHeight: "570px",
    // padding: "10px",
    // borderRadius: "5px",
    // display: "flex",

    // flexDirection: "column"
    flex: 1, // fill remaining space
    overflowY: "auto", // internal scrolling
    padding: "10px",
    backgroundColor: "#f2f2f2",
  },
  inputArea: {
    // display: "flex",
    // marginTop: "20px",
flexShrink: 0, // never shrink
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff",

  },

  messages: {
    background: "linear-gradient(to right, #56ccf2, #2f80ed)",
    padding: "8px 12px",
    marginBottom: "5px 0",
    borderRadius: "9px",
    maxwidth: "60%",
    wordWrap: "break-word",
    display: "inline-block",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  sendButton: {
    marginLeft: "10px",
    padding: "10px 15px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ChatRoom;
