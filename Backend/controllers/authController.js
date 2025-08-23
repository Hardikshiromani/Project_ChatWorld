
const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging log

        // Ensure request body is not empty
        if (!req.body || !req.body.username || !req.body.password) {
            return res.status(400).json({ msg: 'Username and password are required' });
        }

        const { username, password } = req.body;

        // Find user by username
        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check password
        if (password !== user.password) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.userid },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.json({ message: "Login successful", token , user: {
            id: user.userid,
            username: user.username,
            email: user.email, // optional
          }});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { login };
