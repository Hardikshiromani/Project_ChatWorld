const jwt = require("jsonwebtoken"); // Import JSON Web Token library

// **Middleware to Authenticate JWT Token**
const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header (Expected format: Bearer <token>)
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // **Check if token is provided**
  if (!token) return res.status(401).json({ message: "No token provided" });

  // **Verify token using the secret key**
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    // console.log("Token successfully verified:", user);

    // Attach user data to the request object for further use in routes
    req.user = user;
    next(); // Move to the next middleware or route handler
  });
};

// Export the middleware function for use in protected routes
module.exports = { authenticateToken };