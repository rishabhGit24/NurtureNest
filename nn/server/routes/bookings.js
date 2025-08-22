const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const DonationBooking = require("../models/DonationBooking");
const OrphanageContact = require("../models/OrphanageContact");
const User = require("../models/User");
const { sendWhatsAppNotification, sendEmailNotification } = require("../services/notificationService");

// Create a new donation booking
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { orphanageId, category, items, specialInstructions, preferredDate } = req.body;
    const userId = req.user.userId;

    // Validate required fields
    if (!orphanageId || !category || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Orphanage ID, category, and items are required"
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

    // Validate orphanage has required fields
    if (!orphanage.whatsappNumber || !orphanage.email) {
      console.warn(`Orphanage ${orphanage.name} missing required contact fields`);
    }

    // Check if orphanage accepts this category
    if (!orphanage.donationPreferences || !orphanage.donationPreferences.acceptedCategories || !orphanage.donationPreferences.acceptedCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        error: "This orphanage does not accept donations in this category"
      });
    }

    // Create the booking
    const booking = new DonationBooking({
      userId,
      orphanageId,
      category,
      items,
      specialInstructions,
      preferredDate
    });

    await booking.save();

    // Populate user and orphanage details for notifications
    const populatedBooking = await DonationBooking.findById(booking._id)
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('orphanageId', 'name whatsappNumber email ownerName');

    // Send WhatsApp notification to orphanage
    await sendWhatsAppNotification(populatedBooking, 'new_booking');

    // Send email notification to orphanage
    await sendEmailNotification(populatedBooking, 'new_booking');

    res.status(201).json({
      success: true,
      message: "Donation booking created successfully",
      booking: {
        id: booking._id,
        category: booking.category,
        status: booking.status,
        createdAt: booking.createdAt
      }
    });

  } catch (err) {
    console.error('Create booking error:', err);
    console.error('Error details:', {
      message: err.message,
      stack: err.stack,
      name: err.name
    });
    res.status(500).json({
      success: false,
      error: "Internal server error during booking creation"
    });
  }
});

// Get user's donation bookings
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { status, category, page = 1, limit = 10 } = req.query;

    const query = { userId };
    if (status) query.status = status;
    if (category) query.category = category;

    const bookings = await DonationBooking.find(query)
      .populate('orphanageId', 'name address')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await DonationBooking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (err) {
    console.error('Get user bookings error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Get orphanage's donation bookings (for orphanage admins)
router.get("/orphanage/:orphanageId", authMiddleware, async (req, res) => {
  try {
    const { orphanageId } = req.params;
    const { status, category, page = 1, limit = 10 } = req.query;

    const query = { orphanageId };
    if (status) query.status = status;
    if (category) query.category = category;

    const bookings = await DonationBooking.find(query)
      .populate('userId', 'firstName lastName email phoneNumber')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await DonationBooking.countDocuments(query);

    res.json({
      success: true,
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (err) {
    console.error('Get orphanage bookings error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Update booking status (for orphanage admins)
router.patch("/:bookingId/status", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, message } = req.body;
    const adminId = req.user.userId;

    // Validate status
    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status. Must be 'accepted' or 'rejected'"
      });
    }

    // Find the booking
    const booking = await DonationBooking.findById(bookingId)
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('orphanageId', 'name whatsappNumber email ownerName');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }

    // Update booking status
    booking.status = status;
    booking.orphanageResponse = {
      status,
      message,
      respondedAt: new Date(),
      respondedBy: req.user.firstName + ' ' + req.user.lastName
    };

    await booking.save();

    // Send notification to user
    await sendWhatsAppNotification(booking, 'status_update');
    await sendEmailNotification(booking, 'status_update');

    res.json({
      success: true,
      message: `Booking ${status} successfully`,
      booking: {
        id: booking._id,
        status: booking.status,
        orphanageResponse: booking.orphanageResponse
      }
    });

  } catch (err) {
    console.error('Update booking status error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during status update"
    });
  }
});

// Get booking details
router.get("/:bookingId", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.userId;

    const booking = await DonationBooking.findById(bookingId)
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('orphanageId', 'name address whatsappNumber email');

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }

    // Check if user has access to this booking
    if (booking.userId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: "Access denied"
      });
    }

    res.json({
      success: true,
      booking
    });

  } catch (err) {
    console.error('Get booking details error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Cancel a booking (user can only cancel pending bookings)
router.patch("/:bookingId/cancel", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user.userId;

    const booking = await DonationBooking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Booking not found"
      });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        error: "Access denied"
      });
    }

    // Check if booking can be cancelled
    if (booking.status !== 'pending') {
      return res.status(400).json({
        success: false,
        error: "Only pending bookings can be cancelled"
      });
    }

    // Cancel the booking
    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking: {
        id: booking._id,
        status: booking.status
      }
    });

  } catch (err) {
    console.error('Cancel booking error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during cancellation"
    });
  }
});

module.exports = router;
