
import React from "react";
import {MdCall} from 'react-icons/md';
// Dummy image for profile pictures (replace with actual image URLs)
const pic1 = "https://via.placeholder.com/40"; 
import { FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";


const ChatRoom = ({ selectedChat }) => {
  if (!selectedChat || Object.keys(selectedChat).length === 0) {
    return (
      <div style={styles.container}>
      <center>  <h3>Select a chat to start messaging</h3>
      </center>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Chat Header */}
      <div style={styles.header}>
        <img src={selectedChat.profilePic} alt="Profile" style={styles.profilePic} />
        <h3>{selectedChat.name}</h3>
        
        <div style={styles.icons}>
        <AiOutlineUser style={styles.icons}/>
    <FaVideo style={styles.icons} />
    <MdCall style={styles.icons} />
    <BsThreeDotsVertical  style={styles.icons}/>
  </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatArea}>
        <p>
          <strong>{selectedChat.name}:</strong> {selectedChat.message}
        </p>
      </div>

      {/* Chat Input */}
      <div style={styles.inputArea}>
        <input type="text" placeholder="Type a message..." style={styles.input} />
        <button style={styles.sendButton}>Send</button>
      </div>
    </div>
  );
};

// Styling
const styles = {
  container: {
    flex: 1,
    background: "#f9f9f9",
    
    padding: "10px",
    minHeight: "660px",
    marginLeft: "10px",
    // height: "200px",
  },
  icons:{
   display:'flex',
   justifyContent:'space-between',
   marginLeft:'auto',
   gap:'20px',
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
    
  },
  inputArea: {
    display: "flex",
    marginTop: "20px",
  
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
