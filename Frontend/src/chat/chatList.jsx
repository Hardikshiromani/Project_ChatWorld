
import React, { useState } from "react";
import pic1 from "../assets/pic1.png";

const ChatList = ({ onSelectChat }) => {
  const [search, setSearch] = useState("");

  // Dummy chat list data
  const chats = [
    { id: 1, name: "Alice", message: "Hey, how are you?", profilePic: pic1 },
    { id: 2, name: "Bob", message: "Let's meet tomorrow!", profilePic: pic1 },
    { id: 3, name: "Charlie", message: "Check out this link!", profilePic: pic1 },
    { id: 4, name: "David", message: "Thanks for checking out!", profilePic: pic1 },
    { id: 5, name: "Eve", message: "I'm on my way!", profilePic: pic1 },
  ];

  // Filter chats based on search input
  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="chat-list-container" style={styles.container}>
      {/* Search Bar */}
      <h2>Messages</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchBar}
      />

      {/* Chat List */}
      <ul style={styles.list}>
        {filteredChats.map((chat) => (
          <li 
            key={chat.id} 
            style={styles.chatItem} 
            onClick={() => onSelectChat(chat)} // Send selected chat to ChatPage
          >
            <img src={chat.profilePic} alt="Profile" style={styles.profilePic} />
            <strong>{chat.name}</strong>
            <p style={styles.message}>{chat.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: { width: "380px", background: "#fff", padding: "10px", borderRight: "1px solid #ddd", marginLeft: "50px" },
  searchBar: { display: 'flexbox', width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "35px", border: "1px solid #ccc" },
  list: { listStyle: "none", padding: 0 },
  chatItem: { padding: "10px", borderBottom: "1px solid #eee", cursor: "pointer" },
  message: { fontSize: "12px", color: "#666", marginTop: "5px" },
  profilePic: { width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }
};

export default ChatList;
