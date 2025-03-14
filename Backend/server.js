const express = require("express");
const db = require("./config/db"); // Import the database connection
const userRoutes = require("./routes/userRoutes");
const app = express();
// require("dotenv").config();


app.use(express.json()); //middleware for parsing json

app.use(express.urlencoded({ extended: true }));
app.use("/api/user", userRoutes);


const PORT = 5001;

app.get("/", (req, res) => {
  res.send("Hello, Server is Running!");
});

// ✅ Route to Check Database Connection
app.get("/check-db", async (req, res) => {
  try {
    await db.authenticate(); //check connection on suquelize
    res.json({ message: "database connected successfully" });
  } catch (err) {
    console.log("Not Connected to Database", err);
    res.status(500).json({ message: "Not Connected to Database", error: err });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
