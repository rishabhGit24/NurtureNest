const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { sendNotification, sendDonorNotification } = require('../services/notificationService');

const router = express.Router();

// @route   POST /api/notifications/test
// @desc    Test notification service (admin only)
// @access  Private
router.post('/test', protect, authorize('admin'), async (req, res) => {
  try {
    const { type, phone, email, message } = req.body;

    if (!type || (!phone && !email)) {
      return res.status(400).json({ 
        error: 'Type and either phone or email are required' 
      });
    }

    // Test data
    const testData = {
      type,
      orphanage: {
        name: 'Test Orphanage',
        contactPerson: {
          phone: phone || '+1234567890',
          email: email || 'test@example.com'
        }
      },
      donor: {
        name: 'Test Donor',
        email: 'donor@example.com'
      },
      donation: {
        category: 'food',
        subcategory: 'plate meals',
        quantity: 10,
        unit: 'plates',
        notes: { donor: 'Test donation' },
        preferredDeliveryDate: new Date()
      }
    };

    let result;
    if (type === 'donation_request') {
      result = await sendNotification(testData);
    } else if (type === 'donation_status_update') {
      result = await sendDonorNotification(testData);
    } else {
      return res.status(400).json({ 
        error: 'Invalid notification type' 
      });
    }

    res.json({
      success: true,
      message: 'Test notification sent successfully',
      result
    });

  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({ 
      error: 'Failed to send test notification',
      details: error.message 
    });
  }
});

// @route   GET /api/notifications/status
// @desc    Get notification service status
// @access  Private
router.get('/status', protect, async (req, res) => {
  try {
    const status = {
      twilio: {
        configured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
        accountSid: process.env.TWILIO_ACCOUNT_SID ? 'Configured' : 'Not configured',
        phoneNumber: process.env.TWILIO_PHONE_NUMBER || 'Not configured'
      },
      email: {
        configured: !!(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS),
        host: process.env.EMAIL_HOST || 'Not configured',
        user: process.env.EMAIL_USER ? 'Configured' : 'Not configured'
      },
      services: {
        whatsapp: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
        sms: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN),
        email: !!(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS)
      }
    };

    res.json({
      success: true,
      status
    });

  } catch (error) {
    console.error('Get notification status error:', error);
    res.status(500).json({ 
      error: 'Failed to get notification status' 
    });
  }
});

module.exports = router;
