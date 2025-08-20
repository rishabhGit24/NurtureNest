const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-here-make-it-long-and-random";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: "Access denied. No token provided." 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware or route handler
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        error: "Invalid token." 
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        error: "Token expired." 
      });
    }

    return res.status(500).json({ 
      success: false,
      error: "Token verification failed." 
    });
  }
};

module.exports = authMiddleware;
