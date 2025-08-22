const express = require("express");
const router = express.Router();
const axios = require("axios");

// Webhook endpoint for n8n automation triggers
router.post("/n8n-booking-trigger", async (req, res) => {
  try {
    const { booking, notificationType } = req.body;
    
    console.log('🔗 Webhook received - triggering n8n automation...');
    
    // Prepare data for n8n workflow
    const workflowData = {
      timestamp: new Date().toISOString(),
      type: notificationType,
      booking: {
        id: booking._id,
        donor: {
          name: `${booking.userId.firstName} ${booking.userId.lastName}`,
          phone: booking.userId.phoneNumber,
          email: booking.userId.email
        },
        orphanage: {
          name: booking.orphanageId.name,
          phone: booking.orphanageId.whatsappNumber,
          email: booking.orphanageId.email
        },
        donation: {
          category: booking.category,
          items: booking.items,
          specialInstructions: booking.specialInstructions,
          preferredDate: booking.preferredDate
        },
        status: booking.status
      }
    };

    // Send to n8n webhook (if configured)
    if (process.env.N8N_WEBHOOK_URL) {
      try {
        await axios.post(process.env.N8N_WEBHOOK_URL, workflowData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.N8N_API_KEY || ''}`
          },
          timeout: 5000
        });
        console.log('✅ n8n workflow triggered successfully');
      } catch (n8nError) {
        console.error('❌ n8n webhook failed:', n8nError.message);
      }
    }

    // Send to Make.com webhook (if configured)
    if (process.env.MAKE_WEBHOOK_URL) {
      try {
        await axios.post(process.env.MAKE_WEBHOOK_URL, workflowData, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        console.log('✅ Make.com workflow triggered successfully');
      } catch (makeError) {
        console.error('❌ Make.com webhook failed:', makeError.message);
      }
    }

    // Send to Zapier webhook (if configured)
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await axios.post(process.env.ZAPIER_WEBHOOK_URL, workflowData, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        console.log('✅ Zapier workflow triggered successfully');
      } catch (zapierError) {
        console.error('❌ Zapier webhook failed:', zapierError.message);
      }
    }

    // Always return success to avoid blocking the booking process
    res.json({
      success: true,
      message: "Automation webhooks triggered",
      triggered: {
        n8n: !!process.env.N8N_WEBHOOK_URL,
        make: !!process.env.MAKE_WEBHOOK_URL,
        zapier: !!process.env.ZAPIER_WEBHOOK_URL
      }
    });

  } catch (error) {
    console.error('❌ Webhook automation error:', error);
    res.status(500).json({
      success: false,
      error: "Webhook automation failed"
    });
  }
});

// Health check for automation services
router.get("/automation-status", (req, res) => {
  const automationServices = {
    n8n: {
      configured: !!process.env.N8N_WEBHOOK_URL,
      url: process.env.N8N_WEBHOOK_URL ? "***configured***" : "not configured"
    },
    make: {
      configured: !!process.env.MAKE_WEBHOOK_URL,
      url: process.env.MAKE_WEBHOOK_URL ? "***configured***" : "not configured"
    },
    zapier: {
      configured: !!process.env.ZAPIER_WEBHOOK_URL,
      url: process.env.ZAPIER_WEBHOOK_URL ? "***configured***" : "not configured"
    }
  };

  res.json({
    success: true,
    automation: automationServices,
    totalConfigured: Object.values(automationServices).filter(s => s.configured).length
  });
});

// Test webhook endpoint
router.post("/test-automation", async (req, res) => {
  const testData = {
    timestamp: new Date().toISOString(),
    type: "test",
    message: "This is a test automation trigger from NurtureNest",
    booking: {
      donor: { name: "Test User", phone: "+91 7259197398", email: "test@example.com" },
      orphanage: { name: "Test Orphanage", phone: "+91 7259197398" },
      donation: { category: "test", items: [{ name: "Test Item", quantity: 1, unit: "piece" }] }
    }
  };

  let results = [];

  // Test all configured webhooks
  const webhooks = [
    { name: 'n8n', url: process.env.N8N_WEBHOOK_URL },
    { name: 'Make.com', url: process.env.MAKE_WEBHOOK_URL },
    { name: 'Zapier', url: process.env.ZAPIER_WEBHOOK_URL }
  ];

  for (const webhook of webhooks) {
    if (webhook.url) {
      try {
        await axios.post(webhook.url, testData, {
          headers: { 'Content-Type': 'application/json' },
          timeout: 5000
        });
        results.push({ service: webhook.name, status: 'success' });
        console.log(`✅ ${webhook.name} test successful`);
      } catch (error) {
        results.push({ service: webhook.name, status: 'failed', error: error.message });
        console.error(`❌ ${webhook.name} test failed:`, error.message);
      }
    }
  }

  res.json({
    success: true,
    message: "Test automation completed",
    results: results
  });
});

module.exports = router;
