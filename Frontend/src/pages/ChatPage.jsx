import React ,{useState}from "react";
import SideBar from "../chat/SideBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatList from "../chat/chatList";
import ChatRoom from "../chat/ChatRoom";
const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null); //Holds selected chat
  const [showProfile, setShowProfile] = useState(false); //Holds profile visibility
  return (
    <div className="d-flex">
      <SideBar onProfileClick={() => setShowProfile(true)}/>

      
      <ChatList  onSelectChat={setSelectedChat} />
  {/* Conditionally Rendering ChatRoom */}
  {selectedChat ? (
        <ChatRoom selectedChat={selectedChat} />
      ) : (
        <div className="flex-grow-1 text-center mt-5">
          <h4>Select a chat to start messaging</h4>
      </div>
      )}
    </div>
  );
};

export default ChatPage;


// import React, { useState } from "react";
// import SideBar from "../chat/SideBar";
// import "bootstrap/dist/css/bootstrap.min.css";
// import ChatList from "../chat/chatList";
// import ChatRoom from "../chat/ChatRoom";
// import UserProfile from "../chat/UserProfile";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null); // Holds selected chat
//   const [showProfile, setShowProfile] = useState(false); // Controls profile visibility

//   return (
//     <div className="d-flex">
//       <SideBar onProfileClick={() => setShowProfile(true)} /> 

//       {showProfile ? (
//         <UserProfile onClose={() => setShowProfile(false)} />
//       ) : (
//         <>
//           <ChatList onSelectChat={setSelectedChat} />
//           {/* Conditionally Rendering ChatRoom */}
//           {selectedChat ? (
//             <ChatRoom selectedChat={selectedChat} />
//           ) : (
//             <div className="flex-grow-1 text-center mt-5">
//               <h4>Select a chat to start messaging</h4>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default ChatPage;


