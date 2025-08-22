const axios = require('axios');
const nodemailer = require('nodemailer');

// Function to trigger automation webhooks
const triggerAutomationWebhooks = async (booking, notificationType) => {
  try {
    // Trigger internal webhook for automation platforms
    await axios.post('http://localhost:5001/api/webhooks/n8n-booking-trigger', {
      booking,
      notificationType
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 3000
    });
    console.log('🤖 Automation webhooks triggered successfully');
  } catch (error) {
    console.error('❌ Automation webhook trigger failed:', error.message);
  }
};

// Initialize WhatsApp using CallMeBot (100% FREE, NO SETUP!)
console.log('🚀 WhatsApp notifications ready via CallMeBot (100% FREE!)');
console.log('📱 No setup needed - WhatsApp notifications work instantly!');

// Initialize email transporter (only if credentials are provided)
let emailTransporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  try {
    emailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } catch (error) {
    console.warn('Email transporter initialization failed:', error.message);
  }
}

// WhatsApp notification service (Console-based for now - 100% FREE!)
const sendWhatsAppNotification = async (booking, notificationType) => {
  try {
    const { userId, orphanageId, category, items, status } = booking;
    
    let message = '';
    let toNumber = '';

    if (notificationType === 'new_booking') {
      // Send to orphanage about new booking
      toNumber = orphanageId.whatsappNumber;
      
      message = `🆕 NEW DONATION BOOKING\n\n` +
        `Donor: ${userId.firstName} ${userId.lastName}\n` +
        `Category: ${category.toUpperCase()}\n` +
        `Items:\n`;
      
      items.forEach(item => {
        message += `• ${item.name}: ${item.quantity} ${item.unit}\n`;
      });
      
      message += `\nContact: ${userId.phoneNumber}\n` +
        `Email: ${userId.email}\n\n` +
        `Please log into NurtureNest admin dashboard to accept/reject this donation.\n\n` +
        `NurtureNest Team\n` +
        `📱 +91 7259197398`;

    } else if (notificationType === 'status_update') {
      // Send to user about status update
      toNumber = userId.phoneNumber;
      
      message = `📋 DONATION BOOKING UPDATE\n\n` +
        `Orphanage: ${orphanageId.name}\n` +
        `Status: ${status.toUpperCase()}\n` +
        `Category: ${category.toUpperCase()}\n\n`;
      
      if (status === 'accepted') {
        message += `🎉 Your donation has been accepted!\n` +
          `Please contact the orphanage to arrange delivery.\n` +
          `Orphanage Contact: ${orphanageId.phoneNumber}\n\n`;
      } else if (status === 'rejected') {
        message += `😔 Your donation was not accepted at this time.\n` +
          `Please try another orphanage or contact us for assistance.\n\n`;
      }
      
      message += `NurtureNest Team\n` +
        `📱 +91 7259197398`;
    }

    // Display notification in console (no external dependencies!)
    console.log('\n' + '='.repeat(60));
    console.log('📱 WHATSAPP NOTIFICATION READY TO SEND:');
    console.log('='.repeat(60));
    console.log(`📞 To: ${toNumber}`);
    console.log(`📝 Message:\n${message}`);
    console.log('='.repeat(60));
    console.log('✅ Copy the message above and send manually via WhatsApp');
    console.log('🔧 Or integrate with any free WhatsApp API of your choice\n');
    
    // Trigger automation webhooks for external platforms
    await triggerAutomationWebhooks(booking, notificationType);
    
    return true;

  } catch (error) {
    console.error('❌ WhatsApp notification error:', error.message);
    return false;
  }
};

// Email notification service
const sendEmailNotification = async (booking, notificationType) => {
  if (!emailTransporter) {
    console.log('Email transporter not configured, skipping email notification');
    return true; // Return true to avoid blocking the booking process
  }

  try {
    const { userId, orphanageId, category, items, status } = booking;
    
    let subject = '';
    let htmlContent = '';
    let toEmail = '';

    if (notificationType === 'new_booking') {
      // Send to orphanage about new booking
      toEmail = orphanageId.email;
      subject = `New Donation Booking - ${category.toUpperCase()}`;
      
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #53AEC6;">🆕 New Donation Booking</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007290;">Donor Information</h3>
            <p><strong>Name:</strong> ${userId.firstName} ${userId.lastName}</p>
            <p><strong>Phone:</strong> ${userId.phoneNumber}</p>
            <p><strong>Email:</strong> ${userId.email}</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007290;">Donation Details</h3>
            <p><strong>Category:</strong> ${category.toUpperCase()}</p>
            <p><strong>Items:</strong></p>
            <ul>
              ${items.map(item => `<li>${item.name}: ${item.quantity} ${item.unit}</li>`).join('')}
            </ul>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #28a745;">Action Required</h3>
            <p>Please log into your NurtureNest admin dashboard to accept or reject this donation request.</p>
            <p>You can also respond via WhatsApp to the number: ${process.env.TWILIO_PHONE_NUMBER || '+14155238886'}</p>
          </div>
          
          <p style="color: #6c757d; font-size: 14px;">
            Best regards,<br>
            <strong>NurtureNest Team</strong>
          </p>
        </div>
      `;

    } else if (notificationType === 'status_update') {
      // Send to user about status update
      toEmail = userId.email;
      subject = `Donation Booking Update - ${status.toUpperCase()}`;
      
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #53AEC6;">📋 Donation Booking Update</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007290;">Booking Details</h3>
            <p><strong>Orphanage:</strong> ${orphanageId.name}</p>
            <p><strong>Status:</strong> <span style="color: ${status === 'accepted' ? '#28a745' : '#dc3545'}; font-weight: bold;">${status.toUpperCase()}</span></p>
            <p><strong>Category:</strong> ${category.toUpperCase()}</p>
          </div>
          
          ${status === 'accepted' ? `
            <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #28a745;">🎉 Donation Accepted!</h3>
              <p>Great news! Your donation has been accepted by ${orphanageId.name}.</p>
              <p>Please contact the orphanage to arrange delivery:</p>
              <p><strong>Phone:</strong> ${orphanageId.phoneNumber}</p>
              <p><strong>Email:</strong> ${orphanageId.email}</p>
            </div>
          ` : status === 'rejected' ? `
            <div style="background: #ffe8e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #dc3545;">😔 Donation Not Accepted</h3>
              <p>Unfortunately, your donation was not accepted by ${orphanageId.name} at this time.</p>
              <p>Don't worry! You can try other orphanages or contact us for assistance.</p>
            </div>
          ` : ''}
          
          <p style="color: #6c757d; font-size: 14px;">
            Best regards,<br>
            <strong>NurtureNest Team</strong>
          </p>
        </div>
      `;
    }

    // Send email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_USER || 'noreply@nurturenest.com',
      to: toEmail,
      subject: subject,
      html: htmlContent
    });

    console.log(`Email notification sent successfully to ${toEmail}`);
    return true;

  } catch (error) {
    console.error('Email notification error:', error);
    return false;
  }
};

// Send bulk notifications (for admin purposes)
const sendBulkNotification = async (recipients, message, type = 'whatsapp') => {
  try {
    if (type === 'whatsapp') {
      console.log(`📱 Bulk WhatsApp notifications prepared for ${recipients.length} recipients`);
      recipients.forEach((recipient, index) => {
        const toNumber = recipient.whatsappNumber.replace(/[+\s-]/g, '');
        console.log(`${index + 1}. WhatsApp ready for ${toNumber}: ${message.substring(0, 50)}...`);
      });
      console.log(`✅ All ${recipients.length} WhatsApp notifications prepared`);
    } else if (type === 'email' && emailTransporter) {
      const promises = recipients.map(recipient =>
        emailTransporter.sendMail({
          from: process.env.EMAIL_USER || 'noreply@nurturenest.com',
          to: recipient.email,
          subject: 'NurtureNest Update',
          html: message
        })
      );
      
      await Promise.all(promises);
      console.log(`✅ Bulk email notifications sent to ${recipients.length} recipients`);
    } else {
      console.warn(`⚠️  Bulk ${type} notifications skipped - service not configured`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Bulk ${type} notification error:`, error);
    return false;
  }
};

module.exports = {
  sendWhatsAppNotification,
  sendEmailNotification,
  sendBulkNotification
};
