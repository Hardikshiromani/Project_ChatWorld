import React, { useState } from "react";
import { MdCall } from "react-icons/md";
// Dummy image for profile pictures (replace with actual image URLs)
// const pic1 = "https://via.placeholder.com/40";
import { FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

const ChatRoom = ({ selectedChat, setShowProfile }) => {
  const [messages, setMessages] = useState([]); //store chat messages
  const [newMessage, setNewMessage] = useState(""); //store new message

  if (!selectedChat || Object.keys(selectedChat).length === 0) {
    return (
      <div style={styles.container}>
        <center>
          {" "}
          <h3>Select a chat to start messaging</h3>
        </center>
      </div>
    );
  }

  const sendMessage = () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages

    const messageData = {
      sender: "You",
      text: newMessage, // Change this based on the logged-in user
    };

    setMessages([...messages, messageData]); // Add new message to the array
    setNewMessage(""); // Clear input field
  };

  return (
    <div style={styles.container}>
      {/* Chat Header */}
      <div style={styles.header}>
        <img
          src={selectedChat.profilePic}
          alt="Profile"
          style={styles.profilePic}
        />
        <h3>{selectedChat.name}</h3>

        <div style={styles.icons}>
          <AiOutlineUser
            style={styles.icons}
            onClick={() => setShowProfile(true)}
          />
          <FaVideo style={styles.icons} />
          <MdCall style={styles.icons} />
          <BsThreeDotsVertical style={styles.icons} />
        </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.messageContainer(msg.sender === "You")}>


          <p  style={styles.messageBubble(msg.sender === "You")}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          style={styles.input}
        />
        <button style={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

// Styling
const styles = {
  messageContainer: (isSender) => ({
    display: "flex",
    justifyContent: isSender ? "flex-end" : "flex-start", // Align right if sent by user
    // background: "linear-gradient(to right, #56ccf2, #2f80ed)",
    margin:"5px 0",
  }),
  messageBubble:(isSender)=>({
  background: isSender ? "linear-gradient(to right, #56ccf2, #2f80ed)" : "white",
  padding: "8px 12px",
    borderRadius: "9px",
    width: "fit-content",
    maxWidth: "30%",  // Ensures long messages wrap properly
    wordWrap: "break-word",
    alignSelf: isSender ? "flex-end" : "flex-start",


  }),
  container: {
    flex: 1,
    background: "#f9f9f9",

    padding: "10px",
    minHeight: "660px",
    marginLeft: "10px",
    // height: "200px",
  },
  icons: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "auto",
    gap: "20px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingBottom: "10px",
    justifyContent: "space-between",
    // background: "linear-gradient(to right, #56ccf2, #2f80ed)",
    // background: "linear-gradient(to right, #56ccf2, #2f80ed)",
    borderBottom: "1px solid #ddd",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  chatArea: {
    marginTop: "20px",
    minHeight: "570px",
    padding: "10px",
    // background: "rgb(19, 137, 254)",
    borderRadius: "5px",
    flexDirection: "column",
  },
  inputArea: {
    display: "flex",
    marginTop: "20px",
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

// export { chatData };
export default ChatRoom;
