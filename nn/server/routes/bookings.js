const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const DonationBooking = require("../models/DonationBooking");
const OrphanageContact = require("../models/OrphanageContact");
const User = require("../models/User");
const { sendWhatsAppNotification, sendEmailNotification } = require("../services/notificationService");
const { generateResponsePage } = require("../templates/responsePageTemplate");

// Create a new donation booking with WhatsApp integration
router.post("/whatsapp", authMiddleware, async (req, res) => {
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

    // Create the booking
    const booking = new DonationBooking({
      userId,
      orphanageId,
      category,
      items,
      specialInstructions,
      preferredDate,
      status: 'pending' // WhatsApp bookings start as pending
    });

    await booking.save();

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
    console.error('Create WhatsApp booking error:', err);
    res.status(500).json({
      success: false,
      error: "Internal server error during booking creation"
    });
  }
});

// Handle orphanage response via URL clicks
router.get("/response", async (req, res) => {
  try {
    const { bookingId, status } = req.query;

    // Validate parameters
    if (!bookingId || !status) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Request</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
            .error { color: #e74c3c; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2 class="error">❌ Invalid Request</h2>
            <p>Missing required parameters. Please use the link provided in the WhatsApp message.</p>
          </div>
        </body>
        </html>
      `);
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Status</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
            .error { color: #e74c3c; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2 class="error">❌ Invalid Status</h2>
            <p>Status must be either 'accepted' or 'rejected'.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Find the booking
    const booking = await DonationBooking.findById(bookingId)
      .populate('userId', 'firstName lastName email phoneNumber')
      .populate('orphanageId', 'name whatsappNumber email ownerName');

    if (!booking) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Booking Not Found</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
            .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
            .error { color: #e74c3c; }
          </style>
        </head>
        <body>
          <div class="container">
            <h2 class="error">❌ Booking Not Found</h2>
            <p>The booking you're trying to respond to doesn't exist or has been removed.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Check if already responded
    if (booking.status !== 'pending') {
      const statusIcon = booking.status === 'accepted' ? '✅' : '❌';
      const statusText = booking.status === 'accepted' ? 'accepted' : 'rejected';
      const statusColor = booking.status === 'accepted' ? '#27ae60' : '#e74c3c';
      
      const alreadyRespondedHtml = generateResponsePage('already_responded', booking, booking.userId, null);
      return res.send(alreadyRespondedHtml);
    }

    // Update booking status
    booking.status = status;
    booking.orphanageResponse = {
      status,
      message: `Booking ${status} via WhatsApp response link`,
      respondedAt: new Date(),
      respondedBy: booking.orphanageId.ownerName || 'Orphanage Admin'
    };

    await booking.save();

    // Generate WhatsApp notification to donor
    const donor = booking.userId;
    const orphanage = booking.orphanageId;
    
    const statusIcon = status === 'accepted' ? '✅' : '❌';
    const statusEmoji = status === 'accepted' ? '🎉' : '😔';
    
    let donorMessage = `${statusEmoji} *Donation Update from NurtureNest*\n\n`;
    
    if (status === 'accepted') {
      donorMessage += `Great news! ${orphanage.name} has *accepted* your donation request! ${statusIcon}\n\n` +
        `*Donation Details:*\n` +
        `Category: ${booking.category.toUpperCase()}\n` +
        `Items: ${booking.items.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}\n\n` +
        `*Next Steps:*\n` +
        `Please contact the orphanage to arrange delivery:\n` +
        `📞 Phone: ${orphanage.phoneNumber || orphanage.whatsappNumber}\n` +
        `📧 Email: ${orphanage.email}\n\n`;
    } else {
      donorMessage += `${orphanage.name} has *declined* your donation request. ${statusIcon}\n\n` +
        `*Donation Details:*\n` +
        `Category: ${booking.category.toUpperCase()}\n` +
        `Items: ${booking.items.map(item => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}\n\n` +
        `*Don't worry!* You can try:\n` +
        `• Another orphanage in your area\n` +
        `• A different time/date\n` +
        `• Contact us for assistance\n\n`;
    }
    
    donorMessage += `Thank you for your generosity! 🙏\n\n` +
      `*NurtureNest Team*\n` +
      `📱 +91 7259197398`;

    // Clean donor phone number
    const cleanDonorPhone = donor.phoneNumber.replace(/[+\s-]/g, '');
    const donorWhatsAppUrl = `https://wa.me/${cleanDonorPhone}?text=${encodeURIComponent(donorMessage)}`;

    // Generate beautiful response page using template
    const responseHtml = generateResponsePage(status, booking, donor, donorWhatsAppUrl);
    
    res.send(responseHtml);

  } catch (err) {
    console.error('Handle orphanage response error:', err);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Server Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
          .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto; }
          .error { color: #e74c3c; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2 class="error">❌ Server Error</h2>
          <p>Something went wrong while processing your response. Please try again or contact support.</p>
        </div>
      </body>
      </html>
    `);
  }
});

// Create a new donation booking (legacy route - keep for compatibility)
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

    // Note: Legacy route - WhatsApp notifications handled by old system
    // For new WhatsApp flow, use /whatsapp endpoint
    try {
      await sendWhatsAppNotification(populatedBooking, 'new_booking');
      await sendEmailNotification(populatedBooking, 'new_booking');
    } catch (notificationError) {
      console.warn('Notification error (non-blocking):', notificationError.message);
    }

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
