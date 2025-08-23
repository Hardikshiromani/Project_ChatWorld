require("dotenv").config();
const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  
  // Database Password
  {
    host: process.env.DB_HOST, // Corrected host
    port: 3306, // Added port
    dialect: "mysql",
    logging: false,
  }
);

db.authenticate()
  .then(() => {
      console.log('Connected successfully');
  })
  .catch((err) => {
      console.log("Connection failed:", err);
  });

module.exports = db;
