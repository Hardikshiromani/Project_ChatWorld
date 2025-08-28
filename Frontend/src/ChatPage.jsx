
// import React, { useState, useEffect } from "react";
// import SideBar from "../Chat/SideBar"; // Sidebar component for navigation
// import ChatList from "../Chat/chatList"; // Component to display list of chats
// import ChatRoom from "../Chat/ChatRoom"; // Chat room component for active chat
// import UserProfile from "../Chat/UserProfile"; // Displays user profile
// import Status from "./Status"; // Status page component
// import Contacts from "./Contacts"; // Contacts page component
// import Settings from "./Settings"; // Settings page component
// import Login from "../Login"; // Login form component
// import axios from "axios"; // Axios for API calls
// import socket from "../socket"; // Import socket instance for real-time communication
import React, { useState, useEffect } from "react";
import ChatList from "./chat/ChatList"     // ✅ lowercase "c" matches file

import Sidebar from "./chat/SideBar";       // ✅ matches folder + file
import ChatRoom from "./chat/ChatRoom";     // ✅ exact match
// import  UserProfile from "./chat/UserProfile.jsx";
 import UserProfile from "./UserProfile.jsx"; // Displays user profile
import Status from "./Status";
import Contacts from "./Contacts";
import Settings from "./Settings";
import Login from "./Login.jsx";
import axios from "axios";
import socket from "./socket";
// require("dotenv").config();

const BackURL=import.meta.env.VITE_API_URL;


const ChatPage = () => {
  // State variables for chat management
  const [selectedChat, setSelectedChat] = useState(null); // Currently selected chat
  const [showProfile, setShowProfile] = useState(false); // Toggle user profile view
  const [selectedTab, setSelectedTab] = useState("messages"); // Current selected tab
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detects mobile screens
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(false); // Toggle chat room visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Sidebar visibility control
  const [selectedUserProfile, setSelectedUserProfile] = useState(null); // Profile of the user in selected chat
  const [chats, setChats] = useState([]); // Stores chat data

  // Retrieve user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Emit event to join the user's private room on socket connection
  useEffect(() => {
    if (userId) {
      socket.emit("joinRoom", { userId: userId.toString() }); // Join private room
    }
  }, [userId]);
//  console.log(selectedChat);
  // Fetch unread chat messages
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`${BackURL}/api/chat/getUnreadMessages/${userId}`);
        setChats(res.data.messages);
      } catch (err) {
        console.error("Failed to fetch chat list:", err);
      }
    };
    if (userId) fetchChats();
  }, [userId]);

  // Fetch selected user profile when chat changes
  useEffect(() => {
    const fetchSelectedUserProfile = async () => {
      if (selectedChat) {
        // const otherUserId =
          // selectedChat.senderId === userId ? selectedChat.receiverId : selectedChat.senderId;
         const otherUserId = selectedChat.receiverId
    
        try {
          const res = await axios.get(`${BackURL}/api/user/search/${otherUserId}`);
          setSelectedUserProfile(res.data);
          // console.log("Selected chat:", res.data[0]);
        } catch (error) {
          console.error("Failed to fetch selected user profile:", error);
          setSelectedUserProfile(null);
        }
      } else {
        setSelectedUserProfile(null);
      }
    };

    fetchSelectedUserProfile();
  }, [selectedChat, userId]);

  // Create a map of unique chats based on latest message timestamps
  const chatMap = {};
  chats.forEach(chat => {
    let key;

    if (chat.roomId && chat.receiverId === null) {
      key = `room-${chat.roomId}`; // Group chat identifier
    } else if (chat.senderId && chat.receiverId) {
      const id1 = Math.min(chat.senderId, chat.receiverId);
      const id2 = Math.max(chat.senderId, chat.receiverId);
      key = `dm-${id1}-${id2}`; // Private chat identifier
    } else {
      return; // Skip malformed data
    }

    if (!chatMap[key] || new Date(chat.sentAt) > new Date(chatMap[key].sentAt)) {
      chatMap[key] = chat;
    }
  });

  const filteredMessages = chats.filter(chat => {
    if (!selectedChat) return false;

    if (selectedChat.roomId && chat.roomId === selectedChat.roomId) {
      return true;
    }

    if (selectedChat.receiverId && selectedChat.senderId) {
      return (
        (chat.senderId === selectedChat.senderId && chat.receiverId === selectedChat.receiverId) ||
        (chat.senderId === selectedChat.receiverId && chat.receiverId === selectedChat.senderId)
      );
    }
    return false;
  });

  const uniqueChats = Object.values(chatMap); // Extract unique chats


  const handleNewChat = (newMessage) => {
  setChats((prev) => {
    const exists = prev.some(
      (chat) =>
        (chat.senderId === newMessage.senderId && chat.receiverId === newMessage.receiverId) ||
        (chat.senderId === newMessage.receiverId && chat.receiverId === newMessage.senderId)
    );

    if (!exists) {
      return [...prev, newMessage]; // append if it's a new chat
    } else {
      return prev.map((chat) =>
        chat.senderId === newMessage.senderId && chat.receiverId === newMessage.receiverId
          ? { ...chat, content: newMessage.content, sentAt: newMessage.sentAt }
          : chat
      );
    }
  });
};
// const handleNewChat = (newMessage) => {
//   setChats((prev) => {
//     const exists = prev.some(
//       (chat) =>
//         (chat.senderId === newMessage.senderId && chat.receiverId === newMessage.receiverId) ||
//         (chat.senderId === newMessage.receiverId && chat.receiverId === newMessage.senderId)
//     );

//     if (!exists) {
//       return [...prev, newMessage];
//     } else {
//       return prev.map((chat) => {
//         const isSameChat =
//           (chat.senderId === newMessage.senderId && chat.receiverId === newMessage.receiverId) ||
//           (chat.senderId === newMessage.receiverId && chat.receiverId === newMessage.senderId);

//         if (isSameChat) {
//           return {
//             ...chat,
//             content: newMessage.content,
//             sentAt: newMessage.sentAt,
//           };
//         } else {
//           return chat;
//         }
//       });
//     }
//   });
// };

// const handleNewChat = (newMessage) => {
//   const enrichedMessage = {
//     ...newMessage,
//     sentAt: newMessage.sentAt || new Date().toISOString(),
//   };

//   setChats((prevChats) => [...prevChats, enrichedMessage]);
// };


  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarVisible(true); // Always show sidebar on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sidebar control based on device type
  useEffect(() => {
    if (isMobile) {
      setIsSidebarVisible(!isChatRoomVisible && !showProfile);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isMobile, isChatRoomVisible, showProfile]);

  // Function to render tab content dynamically
  const renderTabContent = () => {
    switch (selectedTab) {
      case "messages":
        return (
          <div className="chat-section" style={{ display: "flex", flexGrow: 1 }}>
            {isMobile ? (
              showProfile ? (
                <UserProfile
                  selectedChat={selectedChat}
                  profile={selectedUserProfile}
                  onClose={() => {
                    setShowProfile(false);
                    setIsSidebarVisible(false);
                  }}
                />
              ) : !isChatRoomVisible ? (
                <ChatList
                  chats={uniqueChats}
                  onSelectChat={chat => {
                    setSelectedChat(chat);
                    setIsChatRoomVisible(true);
                    setIsSidebarVisible(false);
                  }}
                />
              ) : (
                <ChatRoom
                  chats={filteredMessages}
                  selectedChat={selectedChat}
                  onBack={() => {
                    setIsChatRoomVisible(false);
                    setIsSidebarVisible(true);
                  }}
                  setShowProfile={setShowProfile}
                   handleNewChat={handleNewChat}
                />
              )
            ) : (
              <>
                <ChatList chats={uniqueChats} onSelectChat={chat => setSelectedChat(chat)} />
                {selectedChat ? (
                  <ChatRoom chats={filteredMessages} selectedChat={selectedChat} handleNewChat={handleNewChat} setShowProfile={setShowProfile}  />
                ) : (
                  <div className="flex-grow-1 text-center mt-5">
                    <h4>Select a chat to start messaging</h4>
                  </div>
                )}
                {showProfile && <UserProfile selectedChat={selectedChat} profile={selectedUserProfile} onClose={() => setShowProfile(false)} />}
              </>
            )}
          </div>
        );

      case "status":
        return <Status />;
      case "contacts":
        return <Contacts />;
      case "settings":
        return <Settings />;
      case "Login":
        return <Login/>;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
      <Sidebar setSelectedTab={setSelectedTab} isSidebarVisible={isSidebarVisible} setIsSidebarVisible={setIsSidebarVisible} />
      {renderTabContent()}
    </div>
  );
};

export default ChatPage;