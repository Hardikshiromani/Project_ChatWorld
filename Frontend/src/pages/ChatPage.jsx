// import React ,{useState}from "react";
// import SideBar from "../chat/SideBar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ChatList from "../chat/chatList";
// import ChatRoom from "../chat/ChatRoom";
// import UserProfile from "../chat/Userprofile";
// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null); //Holds selected chat
//   // const [showProfile, setShowProfile] = useState(false); //Holds profile visibility
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   return (
//     <div className="d-flex">
//       <SideBar />
//       <ChatList  onSelectChat={setSelectedChat} />
      
//   {/* Conditionally Rendering ChatRoom */}
//   {selectedChat ? (
//         <ChatRoom selectedChat={selectedChat} />
//       ) : (
//         <div className="flex-grow-1 text-center mt-5">
//           <h4>Select a chat to start messaging</h4>
//       </div> 
//       )}
//       {/* Conditionally Rendering UserProfil */}
      
//       <UserProfile />

//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState } from "react";
// import SideBar from "../chat/SideBar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ChatList from "../chat/chatList";
// import ChatRoom from "../chat/ChatRoom";
// import UserProfile from "../chat/Userprofile";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null); // Holds selected chat
//   const [showProfile, setShowProfile] = useState(false); // Profile visibility

//   return (
//     <div className="d-flex"  style={{ position: "relative", height: "100vh" }}>
//       <SideBar onProfileClick={() => setShowProfile(true)} />

//       <ChatList onSelectChat={setSelectedChat} />

//       {/* Conditionally Rendering ChatRoom */}
//       {selectedChat && !showProfile ? (
//         <ChatRoom selectedChat={selectedChat} setShowProfile={setShowProfile} />
//       ) : (
//         <div className="flex-grow-1 text-center mt-5">
//           <h4>Select a chat to start messaging</h4>
//         </div>
//       )}

//       {/* Conditionally Rendering UserProfile */}
//       {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
//     </div>
//   );
// };

// export default ChatPage;

/**
 * This is the main component of the chat app. It renders the sidebar, the chat list, and the chat room.
 * It also handles the state of whether the user profile should be shown or not.
 */

import React, { useState } from "react";
import SideBar from "../chat/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatList from "../chat/chatList";
import ChatRoom from "../chat/ChatRoom";
import UserProfile from "../chat/Userprofile";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); // Holds selected chat
  const [showProfile, setShowProfile] = useState(false); // Profile visibility

  return (
    <div className="d-flex" style={{ position: "relative", height: "100vh" }}>
      <SideBar onProfileClick={() => setShowProfile(true)} />

      <ChatList onSelectChat={setSelectedChat} />

      {/* Conditionally Rendering ChatRoom */}
      {selectedChat? (
        <ChatRoom selectedChat={selectedChat} setShowProfile={setShowProfile} />
      ) : (
        <div className="flex-grow-1 text-center mt-5">
          <h4>Select a chat to start messaging</h4>
        </div>
      )}
  
      {/* Conditionally Rendering UserProfile */}
      {showProfile && <UserProfile   selectedChat={selectedChat } onClose={() => setShowProfile(false)} /> }

    </div>
  );
};

export default ChatPage;

