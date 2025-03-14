// const Users = require('../models/userModel');
// const bycrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();


// const login= async(req,res)=>{
//     try{
//     const {username,password}= req.body;
     
//     //if user exists
//      const user= await Users.findOne({where:{username}});
//      if(!user){
//         return res.status(400).json({msg:'Invalid Credentails'});
//      }
//      //check password
//      const isMatch= await bycrypt.compare(password,user.password);

//      if(!isMatch){
//         return res.status(401).json({msg:'Invalid Credentails'});
//      }

//      //generate jwt token
//      const token= jwt.sign({id: user.userid}
//         , process.env.JWT_SECRET,{
//             expiresIn:'2d'
//         });

//         res.json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal server error boss" });
//   }
// };
     
// module.exports={login};


// const Users = require('../models/userModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const login = async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         // Check username and password in a single query
//         const user = await Users.findOne({ where: { username } });

//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(401).json({ msg: 'Invalid Credentials' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ id: user.userid }, process.env.JWT_SECRET, {
//             expiresIn: '2d'
//         });

//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         console.error("Login error:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = { login };

const Users = require('../models/userModel');
// const bcrypt = require('bcryptjs');
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
        // const isMatch = await compare(password, user.password);
        if (password !== user.password) {
            return res.status(401).json({ msg: 'Invalid Credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.userid },
            process.env.JWT_SECRET,
            { expiresIn: '2d' }
        );

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { login };
