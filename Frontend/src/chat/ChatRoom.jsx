import React, { useState ,useEffect} from "react";
import { MdCall } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import ChatInput from "./chatInput"









const ChatRoom = ({ selectedChat, setShowProfile }) => {
  const [messages, setMessages] = useState([]); //store chat messages
  const [newMessage, setNewMessage] = useState(""); //store new message
  const [hoverIcon,sethoveredIcon] =useState(null);

  

  const iconStyle = (iconName) => ({
    fontSize: "20px",
    cursor: "pointer",
    color: hoverIcon === iconName ? "#007bff" : "#333",
    transition: "color 0.1s",
  });
  
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
      timestamp: getCurrentTime(), // Add timestamp
    };

    setMessages([...messages, messageData]); // Add new message to the array
    setNewMessage(""); // Clear input field
  };



  const getCurrentTime=()=>{
  const now =new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // convert to 12-hour format
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;

  }
  useEffect(() => {
    if (selectedChat && selectedChat.name) {
      setMessages([
        { sender: "You", text: "Hey there!",timestamp: getCurrentTime() },
        { sender: selectedChat.name, text: "Hi! How are you?" ,timestamp: getCurrentTime()},
        { sender: "You", text: "I’m doing great, thanks!",timestamp: getCurrentTime() },
        { sender: selectedChat.name, text: "Glad to hear that.",timestamp: getCurrentTime() }
      ]);
    }
  }, [selectedChat]);
  
  return (
    <div style={styles.container}>
      {/* Chat Header */}
      <div style={styles.header}>
        <img
          src={selectedChat.profilePic}
          alt="Profile"
          style={styles.profilePic}
        />
        <div style={styles.nameStatus}>
        <h3 style={styles.name}>{selectedChat.name}</h3>
        <p style={styles.status}>online</p>
        </div>
        <div style={styles.icons}>
          <AiOutlineUser
            style={iconStyle("user")}
            onClick={() => setShowProfile(true)}
            onMouseEnter={() => sethoveredIcon("user")}
            onMouseLeave={() => sethoveredIcon(null)}

          />
          <FaVideo style={iconStyle("video")}
           onMouseEnter={() => sethoveredIcon("video")}
           onMouseLeave={() => sethoveredIcon(null)}

          />
          <MdCall style={iconStyle("call")}
          
          onMouseEnter={() => sethoveredIcon("call")}
          onMouseLeave={() => sethoveredIcon(null)}
/>
          <BsThreeDotsVertical style={iconStyle("dots")}
          
          onMouseEnter={() => sethoveredIcon("dots")}
          onMouseLeave={() => sethoveredIcon(null)}
/>
     
        </div>
      </div>

      {/* Chat Messages */}
      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.messageContainer(msg.sender === "You")}>
            <div style={styles.messageBubble(msg.sender === "You")}>
          {/* <p  style={styles.messageBubble(msg.sender === "You")}> */}
          <p style={styles.messageText}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
          <small style={styles.timestamp}> {msg.timestamp}</small>
          </div>
          </div>
        ))}
      </div>

      <ChatInput newMessage={newMessage}
       setNewMessage={setNewMessage}
       sendMessage={sendMessage}
       />
    </div>
  );
};

// Styling
const styles = {
  messageContainer: (isSender) => ({
    display: "flex",
    justifyContent: isSender ? "flex-end" : "flex-start", // Align right if sent by user
    margin:"5px 0",
  }),
  messageBubble:(isSender)=>({
  background: isSender ? "linear-gradient(to right, #56ccf2, #2f80ed)" : "linear-gradient(to right,rgb(33, 255, 185), rgb(0, 255, 128))",
  padding: "8px 12px",
    borderRadius: "9px",
    width: "fit-content",
    maxWidth: "30%",  // Ensures long messages wrap properly
    wordWrap: "break-word",
    alignSelf: isSender ? "flex-end" : "flex-start",
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-end",



  }),
  container: {
    flex: 1,
    background: "#f9f9f9",
    padding: "10px",
    minHeight: "660px",
    marginLeft: "10px",
  },
  timestamp: {
    fontSize: "10px",
    color: "#eee",
    marginTop: "4px",
    alignSelf: "flex-end",
  }
,   chatArea: {
  flex: 1, // important to expand the chat area
  padding: "10px",
  overflowY: "auto", // this makes it scrollable!
  height: "calc(100vh - 150px)", // or whatever height fits your header + input
  backgroundColor: "#f2f2f2",
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
    borderBottom: "1px solid #ddd",
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
    padding:"0" // closer to name
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
    borderRadius: "5px",
    display: "flex",

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

export default ChatRoom;
