import React, { useState, useRef, useEffect } from "react";
import pic1 from "../assets/pic1.png"; // Default profile image
import axios from "axios";
// ChatList component for displaying available chats
const ChatList = ({ chats, onSelectChat }) => {
  // State variables for UI interactions
  const [search, setSearch] = useState(""); // Search input state
  const [hoveredId, setHoverId] = useState(null); // Hover state for chat items
  const [width, setWidth] = useState(300); // Initial sidebar width
  const isResizing = useRef(false); // Ref for tracking resizing action
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
   const [query, setQuery]= useState("");
// require("dotenv").config();


// const BackURL=process.env.API.URL;
const BackURL=import.meta.env.VITE_API_URL;

  // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;



 useEffect(() => {
    if (!searchTerm) return;

    const delayDebounce = setTimeout(() => {
      axios.get(`${BackURL}/api/user/Users?username=${searchTerm}`)
        .then(res => setResults(res.data.data))
        .catch(err => console.log(err));
    }, 300); // debounce for 300ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);


  // Function to determine chat display name
  const getDisplayName = (chat) => {
    const isGroupChat = chat.receiverId === null;

    if (isGroupChat) {
      return chat.chatroom?.roomName || "Unnamed Group"; // Return group chat name
    }

    return chat.senderId === userId
      ? chat.receiver?.username || "Unknown"
      : chat.sender?.username || "Unknown"; // Return sender or receiver name
  };

  // Filter private and group chats relevant to the user
  const privateChatsOnly = chats.filter(
    (chat) =>
      (chat.receiverId !== null &&
        (chat.receiverId === userId || chat.senderId === userId)) ||
      (chat.receiverId === null && chat.roomId && chat.chatroom?.roomName)
  );

  // Apply search filter to the chat list
  const filteredChats = privateChatsOnly.filter((chat) =>
    getDisplayName(chat).toLowerCase().includes(search.toLowerCase())
  );

  // Handlers for resizing the chat list sidebar
  const handleMouseDown = () => {
    isResizing.current = true;
  };

  const handleMouseMove = (e) => {
    if (isResizing.current) {
      const newWidth = e.clientX;
      if (newWidth > 200 && newWidth < 500) {
        setWidth(newWidth);
      }
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  // Attach resize event listeners on mount and clean up on unmount
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Function to fetch profile photo based on chat type
  const getProfilePhoto = (chat) => {
    if (chat.receiverId === null) {
      return chat.chatroom?.profilePhoto
        ? `${BackURL}${chat.chatroom.profilePhoto}`
        : pic1;
    }

    return chat.senderId !== userId
      ? chat.sender?.profilePhoto
        ? `${BackURL}${chat.sender.profilePhoto}`
        : pic1
      : chat.receiver?.profilePhoto
      ? `${BackURL}${chat.receiver.profilePhoto}`
      : pic1;
  };
useEffect(() => {
  if (searchTerm.trim() === "") {
    setResults([]); // ⬅️ Clear suggestions when search box is empty
  }
}, [searchTerm]);


  return (
    <div
      className="chat-list-container"
      style={{ ...styles.container, width: `${width}px`, marginLeft: "50px" }}
    >
      {/* Search Header */}
      <h4 style={{ marginBottom: "10px" }}>Messages</h4>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchBar}
      />

      {/* Scrollable Chat List */}
      <div style={styles.scrollWrapper}>
        
      {results.length > 0 && (
        <ul className="suggestions" style={styles.list}>
          {results.map(chat => (
            <li key={chat.id}   onClick={() =>
    onSelectChat({
      receiverId: user.id,
      senderId: chat.id,
      sender: user,
      receiver: chat,
      isGroup: false,
      roomId: null,
       messageId: `search-${chat.id}`,
    })
  } style={{
                ...styles.chatItem,
                backgroundColor:
                  hoveredId === chat.messageId ? "#f6f6f6" : "#fff",
              }} >
              <img src={chat.profilePic} alt="profile"   style={styles.profilePic}/>
              <strong>{chat.username}</strong>
              
              {/* <p style= {styles.message}>{chat.bio}</p> */}
            </li>
          ))}
        </ul>
      )}
        <ul style={styles.list}>
          {filteredChats.map((chat) => (
            <li
              key={chat.messageId}
              onClick={() => onSelectChat(chat)}
              onMouseEnter={() => setHoverId(chat.messageId)}
              onMouseLeave={() => setHoverId(null)}
              style={{
                ...styles.chatItem,
                backgroundColor:
                  hoveredId === chat.messageId ? "#f6f6f6" : "#fff",
              }}
            >
              <img
                src={getProfilePhoto(chat)}
                alt="Profile"
                style={styles.profilePic}
              />
              <div>
                <strong>{getDisplayName(chat)}</strong>
                <p style={styles.message}>{chat.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sidebar Resizer */}
      <div onMouseDown={handleMouseDown} style={styles.resizer} />
    </div>
  );
};

// Styles for the ChatList component
const styles = {
  container: {
    height: "100vh",
    background: "#fff",
    padding: "10px",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
    marginleft: "50px",
    position: "relative",
  },
  searchBar: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "35px",
    border: "1px solid #ccc",
  },
  scrollWrapper: {
    overflowY: "auto",
    flex: 1,
    maxHeight: "calc(100vh - 120px)",
    scrollbarWidth: "thin",
    scrollbarColor: "#ccc transparent",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  chatItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background 0.1s ease",
  },
  message: {
    fontSize: "12px",
    color: "#666",
    marginTop: "5px",
  },
  profilePic: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  resizer: {
    width: "5px",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "col-resize",
    backgroundColor: "#eee",
  },
};

export default ChatList;
