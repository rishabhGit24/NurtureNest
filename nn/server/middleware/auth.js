const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret"); // Replace with your secret
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
