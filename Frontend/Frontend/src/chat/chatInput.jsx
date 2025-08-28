
import React, { useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { BsPaperclip, BsEmojiSmile } from "react-icons/bs";
import { BiMicrophone } from "react-icons/bi";

const ChatInput = ({ newMessage, setNewMessage, sendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="position-relative">
      <div className="d-flex align-items-center px-3 py-2"
        style={{
          backgroundColor: "#F8F9FA",
          borderTop: "1px solid #ddd",
          height: "60px",
          width: "100%",
        }}
      >
    <BsEmojiSmile
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            fontSize: "22px",
            color: "#888",
            cursor: "pointer",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          onMouseEnter={(e) => e.target.style.color = "#000"}
          onMouseLeave={(e) => e.target.style.color = "#888"}
        />
       

        <input type="text"
          placeholder="Type a message..."
          className="form-control"
          style={{
            border: "blue",
            outline: "none",
            boxShadow: "none",
            fontSize: "20px",
            lineHeight:"1.5",
          }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          onFocus={(e) => e.target.style.background = "#f5f5f5"}
          onBlur={(e) => e.target.style.background = "transparent"}
        />

        <button onClick={sendMessage}
          style={{
            background: "linear-gradient(135deg, #007bff, #00c6ff)",
            color: "#fff",
            padding: "6px 16px",
            border: "none",
            borderRadius: "20px",
            marginLeft: "10px",
            cursor: "pointer"
          }}>
          send
        </button>

        <BsPaperclip
          style={{
            fontSize: "22px",
            color: "#888",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onMouseEnter={(e) => e.target.style.color = "#000"}
          onMouseLeave={(e) => e.target.style.color = "#888"}
        />

        <BiMicrophone style={{
          fontSize: "22px",
          color: "#888",
          cursor: "pointer",
        }}
          onMouseEnter={(e) => e.target.style.color = "#000"}
          onMouseLeave={(e) => e.target.style.color = "#888"}
        />
      </div>

      {/* Emoji Picker Panel */}
      {showEmojiPicker && (
        <div className="position-absolute bottom-100 start-0 mb-2 z-1" style={{ zIndex: 10 }}>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  )
}

export default ChatInput
