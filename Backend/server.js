const express = require("express"); // Import Express framework
const http = require("http"); // Import HTTP module to create server
const cors = require("cors"); // Import CORS middleware for handling cross-origin requests
const { Server } = require("socket.io"); // Import Socket.io for real-time communication
const app = express(); // Initialize Express application
const User = require("./models/userModel"); // Import user model
const server = http.createServer(app); // Create HTTP server using Express
const { intialiseSocket } = require("./controllers/chatController"); // Import socket initialization function
require("dotenv").config(); // Load environment variables from .env file
const db = require("./db"); // Import database connection
const path = require("path"); // Import path module for file system operations

// Middleware to handle CORS and JSON parsing
const io = new Server(server, {
  cors: {
      origin: [
      "http://localhost:5173", // local frontend
      "https://project-chat-world.vercel.app" // deployed frontend
    ],
    methods: ["GET", "POST","PUT","DELETE"],
    credentials:true
  },
});

// Middleware to allow CORS from specific origin
app.use(
  cors({
 // frontend origin
    origin:[ "http://localhost:5173",  
    "https://project-chat-world.vercel.app" // for deployed frontend
  ],
   methods: ["GET", "POST","PUT","DELETE"],
credentials: true,

})
);


// Importing routes for user, chat, and file handling
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const fileRoutes = require("./routes/fileRoutes");

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/file", fileRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

intialiseSocket(io);
app.get("/", (req, res) => {
  res.send("Hello, Server is Running!");
});

// Route to save FCM (Firebase Cloud Messaging) token for push notifications

app.post("/api/save-fcm-token", async (req, res) => {
  const { token, userId } = req.body;

  // Validate input data

  if (!userId || !token)
    return res.status(400).json({ message: "Missing userId or token" });

  try {
    // Update user with FCM token
    await User.update({ fcmtoken: token }, { where: { userid: userId } });
    res.status(200).json({ message: "Token saved successfully" });
    // console.log("📩 Received FCM token: SUCESSS", token);
  } catch (error) {
    console.error("Error saving FCM token:", error);
    res.status(500).json({ error: "Failed to save token" });
  }
});

//middleware for parsing json

app.use(express.urlencoded({ extended: true }));

const PORT = 5000;


//  Route to Check Database Connection
app.get("/check-db", async (req, res) => {
  try {
    await db.authenticate(); //check connection on suquelize
    res.json({ message: "database connected successfully" });
  } catch (err) {
    console.log("Not Connected to Database", err);
    res.status(500).json({ message: "Not Connected to Database", error: err });
  }
});


// Start the server on the specified port

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
