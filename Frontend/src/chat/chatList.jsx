
import React, { useState, useRef, useEffect } from "react";
import pic1 from "../assets/pic1.png";

const ChatList = ({ onSelectChat }) => {
  const [search, setSearch] = useState("");
  const [hoveredId, setHoverId] = useState(null);
  const [width, setWidth] = useState(300); // Initial sidebar width
  const isResizing = useRef(false);

  const chats = [
    { id: 1, name: "Alice", message: "Hey, how are you?", profilePic: pic1 },
    { id: 2, name: "Bob", message: "Let's meet tomorrow!", profilePic: pic1 },
    { id: 3, name: "Charlie", message: "Check out this link!", profilePic: pic1 },
    { id: 4, name: "David", message: "Thanks for checking out!", profilePic: pic1 },
    { id: 5, name: "Eve", message: "I'm on my way!", profilePic: pic1 },
    { id: 6, name: "Alice", message: "Hey, how are you?", profilePic: pic1 },
    { id: 7, name: "Bob", message: "Let's meet tomorrow!", profilePic: pic1 },
    { id: 8, name: "Charlie", message: "Check out this link!", profilePic: pic1 },
    { id: 9, name: "David", message: "Thanks for checking out!", profilePic: pic1 },
    { id: 10, name: "Eve", message: "I'm on my way!", profilePic: pic1 },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

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

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      className="chat-list-container"
      style={{ ...styles.container, width: `${width}px`, marginLeft: "50px" }}
    >
      <h4 style={{ marginBottom: "10px" }}>Messages</h4>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBar}
      />

      {/* Scrollable Wrapper */}
      <div style={styles.scrollWrapper}>
        <ul style={styles.list}>
          {filteredChats.map((chat) => (
            <li
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              onMouseEnter={() => setHoverId(chat.id)}
              onMouseLeave={() => setHoverId(null)}
              style={{
                ...styles.chatItem,
                backgroundColor: hoveredId === chat.id ? "#f6f6f6" : "#fff",
              }}
            >
              <img src={chat.profilePic} alt="Profile" style={styles.profilePic} />
              <div>
                <strong>{chat.name}</strong>
                <p style={styles.message}>{chat.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Resizer */}
      <div onMouseDown={handleMouseDown} style={styles.resizer} />
    </div>
  );
};

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
