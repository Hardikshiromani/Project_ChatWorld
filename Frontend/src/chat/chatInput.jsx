import React from 'react'
import { BsPaperclip, BsEmojiSmile } from "react-icons/bs";
import { BiMicrophone } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({newMessage,setNewMessage,sendMessage}) => {
  return (
    <div className="d-flex align-items-center px-3 py-2"
     style={{
      backgroundColor: "#F8F9FA",
      borderTop: "1px solid #ddd",
      height: "60px",
      width: "100%",
     }}
    >

<BsPaperclip
        style={{
          fontSize: "20px",
          color: "#888",
          cursor: "pointer",
          marginRight: "10px",
        }}
        onMouseEnter={(e) => e.target.style.color = "#000"}
        onMouseLeave={(e) => e.target.style.color = "#888"}
      />
      <input type="text"
       placeholder="Type a message..."
       className="form-control"
       style={{
        border: "none",
        outline: "none",
        boxShadow: "none",
        fontSize: "14px",
      }}
       value={newMessage}
        onChange={(e)=> setNewMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}

        onFocus={(e) => e.target.style.background = "#f5f5f5"}
        onBlur={(e) => e.target.style.background = "transparent"}
        />


<button style={{
  background: "linear-gradient(135deg, #007bff, #00c6ff)",
  color: "#fff",
  padding: "6px 16px",
  border: "none",
  borderRadius: "20px",
  marginLeft: "10px",
  cursor: "pointer"
}}>
  {/* <IoMdSend />
   */}
   send
</button>

<BsEmojiSmile style={{ fontSize: "20px",
          color: "#888",
          cursor: "pointer",
          marginLeft: "10px",
          marginRight: "10px",
        }}
        onMouseEnter={(e) => e.target.style.color = "#000"}
  onMouseLeave={(e) => e.target.style.color = "#888"}
      />

<BiMicrophone style={{
          fontSize: "20px",
          color: "#888",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => e.target.style.color = "#000"}
        onMouseLeave={(e) => e.target.style.color = "#888"}
      />
    </div>
  )
}

export default ChatInput
