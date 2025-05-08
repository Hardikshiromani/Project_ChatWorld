
// import React, { useState, useEffect } from "react";
// import SideBar from "../chat/SideBar";
// import ChatList from "../chat/ChatList";
// import ChatRoom from "../chat/ChatRoom";
// import UserProfile from "../chat/UserProfile";
// import Status from "../pages/Status";
// import Contacts from "../pages/Contacts";
// import Settings from "../pages/Settings";
// import LoginForm from "./Loginform";

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [showProfile, setShowProfile] = useState(false);
//   const [selectedTab, setSelectedTab] = useState("messages");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
//   const [isChatRoomVisible, setIsChatRoomVisible] = useState(false);
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);

//   // ✅ Detect screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setIsSidebarVisible(true); // On desktop always show sidebar
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

// // Control sidebar visibility based on device
// useEffect(() => {
//   if (isMobile) {
//     setIsSidebarVisible(!isChatRoomVisible);
//   } else {
//     setIsSidebarVisible(true);
//   }
// }, [isMobile, isChatRoomVisible]);
//   const renderTabContent = () => {
//     switch (selectedTab) {
//       case "messages":
//         return (
//           <div className="chat-section" style={{ display: "flex", flexGrow: 1 }}>
//             {isMobile ? (
//               !isChatRoomVisible ? (
//                 <ChatList
//                   onSelectChat={(chat) => {
//                     setSelectedChat(chat);
//                     setIsChatRoomVisible(true);
//                     if(isMobile){
//                     setIsSidebarVisible(false);
//                     } // 👈 Hide sidebar after selecting chat
//                   }}
//                 />
//               ) : (
//                 <div
//                 style={{
//                   width: `calc(100% - ${isSidebarVisible ? 0 : 44}px)`, // just in case
//                   marginLeft: isSidebarVisible ? 0 : "44px",
//                   transition: "all 0.3s ease",
//                 }}
//                 className="flex-grow-1"
//               >
//                 <ChatRoom
//                   selectedChat={selectedChat}
//                   onBack={() => {
//                     setIsChatRoomVisible(false);
//                     setIsSidebarVisible(true); // 👈 Show sidebar again on back
//                   }}
//                   setShowProfile={setShowProfile}
//                 />
//                 </div>
//               )
//             ) : (
//               <>
//                 <ChatList
//                   onSelectChat={(chat) => setSelectedChat(chat)}
//                 />
//                 {selectedChat ? (
//                   <ChatRoom
//                     selectedChat={selectedChat}
//                     setShowProfile={setShowProfile}
//                   />
//                 ) : (
//                   <div className="flex-grow-1 text-center mt-5">
//                     <h4>Select a chat to start messaging</h4>
//                   </div>
//                 )}
//                 {showProfile && (
//                   <UserProfile
//                     selectedChat={selectedChat}
//                     onClose={() => setShowProfile(false)}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         );
//       case "status":
//         return <Status />;
//       case "contacts":
//         return <Contacts />;
//       case "settings":
//         return <Settings />;
//       case "Login":
//         return <LoginForm />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
//       <SideBar
//         setSelectedTab={setSelectedTab}
//         isSidebarVisible={isSidebarVisible}
//         setIsSidebarVisible={setIsSidebarVisible}
//         // isMobile={isMobile}
//       />
//       {renderTabContent()}
//     </div>
//   );
// };

// export default ChatPage;


import React, { useState, useEffect } from "react";
import SideBar from "../chat/SideBar";
import ChatList from "../chat/ChatList";
import ChatRoom from "../chat/ChatRoom";
import UserProfile from "../chat/UserProfile";
import Status from "../pages/Status";
import Contacts from "../pages/Contacts";
import Settings from "../pages/Settings";
import LoginForm from "./Loginform";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedTab, setSelectedTab] = useState("messages");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isChatRoomVisible, setIsChatRoomVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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

  // Sidebar control based on device
  useEffect(() => {
    if (isMobile) {
      setIsSidebarVisible(!isChatRoomVisible && !showProfile);
    } else {
      setIsSidebarVisible(true);
    }
  }, [isMobile, isChatRoomVisible, showProfile]);

  const renderTabContent = () => {
    switch (selectedTab) {
      case "messages":
        return (
          <div className="chat-section" style={{ display: "flex", flexGrow: 1 }}>
            {isMobile ? (
              showProfile ? (
                <div
                  style={{
                    width: `calc(100% - ${isSidebarVisible ? 0 : 44}px)`,
                    marginLeft: isSidebarVisible ? 0 : "44px",
                    transition: "all 0.3s ease",
                  }}
                  className="flex-grow-1"
                >
                  <UserProfile
                    selectedChat={selectedChat}
                    onClose={() => {
                      setShowProfile(false);
                      setIsSidebarVisible(false);
                    }}
                  />
                </div>
              ) : !isChatRoomVisible ? (
                <ChatList
                  onSelectChat={(chat) => {
                    setSelectedChat(chat);
                    setIsChatRoomVisible(true);
                    setIsSidebarVisible(false);
                  }}
                />
              ) : (
                <div
                  style={{
                    width: `calc(100% - ${isSidebarVisible ? 0 : 44}px)`,
                    marginLeft: isSidebarVisible ? 0 : "44px",
                    transition: "all 0.3s ease",
                  }}
                  className="flex-grow-1"
                >
                  <ChatRoom
                    selectedChat={selectedChat}
                    onBack={() => {
                      setIsChatRoomVisible(false);
                      setIsSidebarVisible(true);
                    }}
                    setShowProfile={setShowProfile}
                  />
                </div>
              )
            ) : (
              <>
                <ChatList onSelectChat={(chat) => setSelectedChat(chat)} />
                {selectedChat ? (
                  <ChatRoom
                    selectedChat={selectedChat}
                    setShowProfile={setShowProfile}
                  />
                ) : (
                  <div className="flex-grow-1 text-center mt-5">
                    <h4>Select a chat to start messaging</h4>
                  </div>
                )}
                {showProfile && (
                  <UserProfile
                    selectedChat={selectedChat}
                    onClose={() => setShowProfile(false)}
                  />
                )}
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
        return <LoginForm />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex" style={{ width: "100vw", height: "100vh" }}>
      <SideBar
        setSelectedTab={setSelectedTab}
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={setIsSidebarVisible}
      />
      {renderTabContent()}
    </div>
  );
};

export default ChatPage;
