const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OrphanageAdmin = require("../models/OrphanageAdmin");
const OrphanageContact = require("../models/OrphanageContact");
const DonationBooking = require("../models/DonationBooking");
const authMiddleware = require("../middleware/auth");

// Orphanage admin registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phoneNumber, orphanageId, ownerName, ownerPhone, ownerEmail } = req.body;

    // Validate required fields
    if (!name || !email || !password || !phoneNumber || !orphanageId) {
      return res.status(400).json({
        success: false,
        error: "All required fields must be provided"
      });
    }

    // Check if admin already exists
    const existingAdmin = await OrphanageAdmin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: "Admin with this email already exists"
      });
    }

    // Check if orphanage exists
    const orphanage = await OrphanageContact.findById(orphanageId);
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        error: "Orphanage not found"
      });
    }

    // Create orphanage contact if it doesn't exist
    if (!orphanage.ownerName) {
      orphanage.ownerName = ownerName || name;
      orphanage.ownerPhone = ownerPhone || phoneNumber;
      orphanage.ownerEmail = ownerEmail || email;
      await orphanage.save();
    }

    // Create admin account
    const admin = new OrphanageAdmin({
      name,
      email,
      password,
      phoneNumber,
      orphanageId,
      role: 'owner'
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin._id, 
        orphanageId: admin.orphanageId,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: "Orphanage admin registered successfully",
      admin: admin.getPublicProfile(),
      token
    });

  } catch (err) {
    console.error('Admin registration error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during registration"
    });
  }
});

// Orphanage admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required"
      });
    }

    // Find admin by email
    const admin = await OrphanageAdmin.findOne({ email }).populate('orphanageId', 'name');
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        error: "Account is deactivated"
      });
    }

    // Verify password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password"
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        adminId: admin._id, 
        orphanageId: admin.orphanageId,
        role: admin.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: "Login successful",
      admin: admin.getPublicProfile(),
      token
    });

  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during login"
    });
  }
});

// Get admin profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const admin = await OrphanageAdmin.findById(req.user.adminId)
      .populate('orphanageId', 'name address whatsappNumber email');

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Admin not found"
      });
    }

    res.json({
      success: true,
      admin: admin.getPublicProfile()
    });

  } catch (err) {
    console.error('Get admin profile error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Update admin profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, phoneNumber, profile } = req.body;
    const admin = await OrphanageAdmin.findById(req.user.adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: "Admin not found"
      });
    }

    // Update fields
    if (name) admin.name = name;
    if (phoneNumber) admin.phoneNumber = phoneNumber;
    if (profile) admin.profile = { ...admin.profile, ...profile };

    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      admin: admin.getPublicProfile()
    });

  } catch (err) {
    console.error('Update admin profile error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during profile update"
    });
  }
});

// Get dashboard statistics
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const orphanageId = req.user.orphanageId;

    // Get booking counts by status
    const pendingCount = await DonationBooking.countDocuments({ 
      orphanageId, 
      status: 'pending' 
    });
    
    const acceptedCount = await DonationBooking.countDocuments({ 
      orphanageId, 
      status: 'accepted' 
    });
    
    const rejectedCount = await DonationBooking.countDocuments({ 
      orphanageId, 
      status: 'rejected' 
    });
    
    const completedCount = await DonationBooking.countDocuments({ 
      orphanageId, 
      status: 'completed' 
    });

    // Get recent bookings
    const recentBookings = await DonationBooking.find({ orphanageId })
      .populate('userId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get category-wise statistics
    const categoryStats = await DonationBooking.aggregate([
      { $match: { orphanageId: orphanageId } },
      { $group: { 
        _id: '$category', 
        count: { $sum: 1 },
        pending: { 
          $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } 
        },
        accepted: { 
          $sum: { $cond: [{ $eq: ['$status', 'accepted'] }, 1, 0] } 
        }
      }},
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      dashboard: {
        counts: {
          pending: pendingCount,
          accepted: acceptedCount,
          rejected: rejectedCount,
          completed: completedCount,
          total: pendingCount + acceptedCount + rejectedCount + completedCount
        },
        recentBookings,
        categoryStats
      }
    });

  } catch (err) {
    console.error('Get dashboard error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Get orphanage information
router.get("/orphanage", authMiddleware, async (req, res) => {
  try {
    const orphanage = await OrphanageContact.findById(req.user.orphanageId);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        error: "Orphanage not found"
      });
    }

    res.json({
      success: true,
      orphanage
    });

  } catch (err) {
    console.error('Get orphanage info error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Get all orphanages (public endpoint)
router.get("/orphanages", async (req, res) => {
  try {
    const orphanages = await OrphanageContact.find({ isActive: true })
      .select('name address phoneNumber whatsappNumber email donationPreferences')
      .sort({ name: 1 });

    res.json({
      success: true,
      orphanages
    });

  } catch (err) {
    console.error('Get orphanages error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Update orphanage information
router.put("/orphanage", authMiddleware, async (req, res) => {
  try {
    const { 
      phoneNumber, 
      whatsappNumber, 
      email, 
      address, 
      operatingHours, 
      donationPreferences 
    } = req.body;

    const orphanage = await OrphanageContact.findById(req.user.orphanageId);
    
    if (!orphanage) {
      return res.status(404).json({
        success: false,
        error: "Orphanage not found"
      });
    }

    // Update fields
    if (phoneNumber) orphanage.phoneNumber = phoneNumber;
    if (whatsappNumber) orphanage.whatsappNumber = whatsappNumber;
    if (email) orphanage.email = email;
    if (address) orphanage.address = address;
    if (operatingHours) orphanage.operatingHours = operatingHours;
    if (donationPreferences) orphanage.donationPreferences = donationPreferences;

    await orphanage.save();

    res.json({
      success: true,
      message: "Orphanage information updated successfully",
      orphanage
    });

  } catch (err) {
    console.error('Update orphanage error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during update"
    });
  }
});

module.exports = router;
