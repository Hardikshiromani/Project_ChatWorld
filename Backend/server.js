const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const{intialiseSocket}= require("./controllers/chatController");
require("dotenv");
const db = require("./db");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

intialiseSocket(io);
app.get("/", (req, res) => {
  res.send("Hello, Server is Running!");
});


app.use(express.json()); //middleware for parsing json

app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);

const PORT = 5070;

app.get("/", (req, res) => {
  res.send("Hello, Server is Running!");
});

// console.log("DB_USER in server.js:", process.env.DB_USER);

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


server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
