import React from "react";
import SideBar from "../chat/SideBar";
// import NavBar from "../chat/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import ChatList from "../chat/chatList";
const ChatPage = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <ChatList/>
      <SideBar />
    </div>
  );
};

export default ChatPage;
