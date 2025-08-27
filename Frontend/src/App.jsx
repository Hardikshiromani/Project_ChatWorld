// require("dotenv").config();
import React, { useEffect } from "react";
import Loginform from "./pages/Loginform"; // Import Login form component
import { Routes, Route } from "react-router-dom"; // Import routing functionalities
import Signup from "./pages/Signup"; // Import Signup page component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap for styling
import Profilepage from "./pages/Profilepage"; // Import Profile page component
import ChatPage from "./pages/ChatPage"; // Import Chat page component
import { requestFCMToken, listenToMessages } from "./firebasenotification"; // Import Firebase notification functions


// const BackURL=process.env.API.URL;
const BackURL=import.meta.env.VITE_API_URL;

// Retrieve user details from local storage
const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;

// Main Application Component
function App() {
  useEffect(() => {
    // Function to request and save Firebase Cloud Messaging (FCM) token
    async function getTokenAndSave() {
      const token = await requestFCMToken(); // Request FCM token

      // If token is retrieved, send it to backend API
      if (token) {
        await fetch(`${BackURL}/api/save-fcm-token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, userId }), // Send token along with userId
        });
      }
    }

    // Call the function to fetch and save token
    getTokenAndSave();

    // Start listening for incoming messages via Firebase
    listenToMessages();
  }, []); // Runs once on component mount

  return (
    <>
      {/* Define application routes */}
      <Routes>
        <Route path="/" element={<Loginform />} /> {/* Default login route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page route */}
        <Route path="/Profilepage" element={<Profilepage />} /> {/* Profile page route */}
        <Route path="/ChatPage" element={<ChatPage />} /> {/* Chat page route */}
      </Routes>
    </>
  );
}

export default App; // Export the App component for use elsewhere