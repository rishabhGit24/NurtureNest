const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");

// In-memory storage for feedback (in production, use a database)
let feedbacks = [];

// Submit feedback
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { feedback, rating } = req.body;
    
    // Validate required fields
    if (!feedback || !rating) {
      return res.status(400).json({ 
        success: false,
        error: "Feedback and rating are required" 
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ 
        success: false,
        error: "Rating must be between 1 and 5" 
      });
    }

    // Create feedback object
    const newFeedback = {
      id: Date.now().toString(),
      userId: req.user.userId,
      userEmail: req.user.email,
      feedback: feedback.trim(),
      rating: parseInt(rating),
      createdAt: new Date()
    };

    // Store feedback
    feedbacks.push(newFeedback);

    res.status(201).json({ 
      success: true,
      message: "Feedback submitted successfully",
      feedback: {
        id: newFeedback.id,
        feedback: newFeedback.feedback,
        rating: newFeedback.rating,
        createdAt: newFeedback.createdAt
      }
    });

  } catch (err) {
    console.error('Submit feedback error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error during feedback submission" 
    });
  }
});

// Get all feedback (admin only - in production, add role-based access control)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // For now, return all feedback. In production, add pagination and filtering
    const publicFeedbacks = feedbacks.map(fb => ({
      id: fb.id,
      feedback: fb.feedback,
      rating: fb.rating,
      createdAt: fb.createdAt
    }));

    res.json({ 
      success: true,
      count: publicFeedbacks.length,
      feedbacks: publicFeedbacks
    });

  } catch (err) {
    console.error('Get feedback error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Get feedback by user
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userFeedbacks = feedbacks
      .filter(fb => fb.userId === req.user.userId)
      .map(fb => ({
        id: fb.id,
        feedback: fb.feedback,
        rating: fb.rating,
        createdAt: fb.createdAt
      }));

    res.json({ 
      success: true,
      count: userFeedbacks.length,
      feedbacks: userFeedbacks
    });

  } catch (err) {
    console.error('Get user feedback error:', err);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

module.exports = router;
