const twilio = require('twilio');
const nodemailer = require('nodemailer');

// Initialize Twilio client
const twilioClient = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

// Initialize email transporter
const emailTransporter = process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS
  ? nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_PORT === '465',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  : null;

// Notification templates
const notificationTemplates = {
  donation_request: {
    whatsapp: (data) => `📢 *New Donation Request!*

*Donor:* ${data.donor.name}
*Item:* ${data.donation.category} - ${data.donation.subcategory} (${data.donation.quantity} ${data.donation.unit})
*Orphanage:* ${data.orphanage.name}
*Notes:* ${data.donation.notes?.donor || 'No additional notes'}
*Delivery Date:* ${new Date(data.donation.preferredDeliveryDate).toLocaleDateString()}

Please review and respond to this donation request.`,
    
    email: (data) => ({
      subject: 'New Donation Request - NurtureNest',
      html: `
        <h2>📢 New Donation Request!</h2>
        <p><strong>Donor:</strong> ${data.donor.name}</p>
        <p><strong>Item:</strong> ${data.donation.category} - ${data.donation.subcategory} (${data.donation.quantity} ${data.donation.unit})</p>
        <p><strong>Orphanage:</strong> ${data.orphanage.name}</p>
        <p><strong>Notes:</strong> ${data.donation.notes?.donor || 'No additional notes'}</p>
        <p><strong>Delivery Date:</strong> ${new Date(data.donation.preferredDeliveryDate).toLocaleDateString()}</p>
        <br>
        <p>Please review and respond to this donation request.</p>
      `
    })
  },
  
  donation_status_update: {
    whatsapp: (data) => `🔄 *Donation Status Update*

*Item:* ${data.donation.category} - ${data.donation.subcategory}
*New Status:* ${data.donation.status.toUpperCase()}
*Orphanage:* ${data.orphanage.name}
${data.donation.notes?.orphanage ? `*Notes:* ${data.donation.notes.orphanage}` : ''}

Your donation request has been updated.`,
    
    email: (data) => ({
      subject: 'Donation Status Update - NurtureNest',
      html: `
        <h2>🔄 Donation Status Update</h2>
        <p><strong>Item:</strong> ${data.donation.category} - ${data.donation.subcategory}</p>
        <p><strong>New Status:</strong> ${data.donation.status.toUpperCase()}</p>
        <p><strong>Orphanage:</strong> ${data.orphanage.name}</p>
        ${data.donation.notes?.orphanage ? `<p><strong>Notes:</strong> ${data.donation.notes.orphanage}</p>` : ''}
        <br>
        <p>Your donation request has been updated.</p>
      `
    })
  },
  
  orphanage_verification: {
    whatsapp: (data) => `✅ *Orphanage Verification Update*

*Orphanage:* ${data.orphanage.name}
*Status:* ${data.verificationStatus.toUpperCase()}
${data.verificationNotes ? `*Notes:* ${data.verificationNotes}` : ''}

Your orphanage verification has been processed.`,
    
    email: (data) => ({
      subject: 'Orphanage Verification Update - NurtureNest',
      html: `
        <h2>✅ Orphanage Verification Update</h2>
        <p><strong>Orphanage:</strong> ${data.orphanage.name}</p>
        <p><strong>Status:</strong> ${data.verificationStatus.toUpperCase()}</p>
        ${data.verificationNotes ? `<p><strong>Notes:</strong> ${data.verificationNotes}</p>` : ''}
        <br>
        <p>Your orphanage verification has been processed.</p>
      `
    })
  }
};

// Send WhatsApp notification via Twilio
const sendWhatsAppNotification = async (to, message) => {
  if (!twilioClient) {
    throw new Error('Twilio not configured');
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `whatsapp:${to}`
    });
    
    console.log('WhatsApp notification sent:', result.sid);
    return result;
  } catch (error) {
    console.error('WhatsApp notification failed:', error);
    throw error;
  }
};

// Send SMS notification via Twilio
const sendSMSNotification = async (to, message) => {
  if (!twilioClient) {
    throw new Error('Twilio not configured');
  }

  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER.replace('whatsapp:', ''),
      to: to
    });
    
    console.log('SMS notification sent:', result.sid);
    return result;
  } catch (error) {
    console.error('SMS notification failed:', error);
    throw error;
  }
};

// Send email notification
const sendEmailNotification = async (to, subject, html) => {
  if (!emailTransporter) {
    throw new Error('Email not configured');
  }

  try {
    const result = await emailTransporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: html
    });
    
    console.log('Email notification sent:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email notification failed:', error);
    throw error;
  }
};

// Main notification function
const sendNotification = async (data) => {
  const { type, orphanage, donor, donation, verificationStatus, verificationNotes } = data;
  
  if (!notificationTemplates[type]) {
    throw new Error(`Unknown notification type: ${type}`);
  }

  const template = notificationTemplates[type];
  const notificationData = { ...data };

  try {
    // Try WhatsApp first (if phone number exists)
    if (orphanage.contactPerson?.phone) {
      try {
        const whatsappMessage = template.whatsapp(notificationData);
        await sendWhatsAppNotification(orphanage.contactPerson.phone, whatsappMessage);
        console.log(`WhatsApp notification sent to ${orphanage.contactPerson.phone}`);
        return;
      } catch (whatsappError) {
        console.error('WhatsApp failed, trying email:', whatsappError);
      }
    }

    // Fallback to email
    if (orphanage.contactPerson?.email) {
      try {
        const emailData = template.email(notificationData);
        await sendEmailNotification(
          orphanage.contactPerson.email,
          emailData.subject,
          emailData.html
        );
        console.log(`Email notification sent to ${orphanage.contactPerson.email}`);
        return;
      } catch (emailError) {
        console.error('Email failed:', emailError);
      }
    }

    // If both fail, try SMS as last resort
    if (orphanage.contactPerson?.phone) {
      try {
        const smsMessage = template.whatsapp(notificationData).replace(/\*/g, ''); // Remove markdown
        await sendSMSNotification(orphanage.contactPerson.phone, smsMessage);
        console.log(`SMS notification sent to ${orphanage.contactPerson.phone}`);
        return;
      } catch (smsError) {
        console.error('SMS failed:', smsError);
      }
    }

    throw new Error('All notification methods failed');

  } catch (error) {
    console.error('Notification service error:', error);
    throw error;
  }
};

// Send notification to donor
const sendDonorNotification = async (data) => {
  const { type, donor, orphanage, donation } = data;
  
  if (!notificationTemplates[type]) {
    throw new Error(`Unknown notification type: ${type}`);
  }

  const template = notificationTemplates[type];
  const notificationData = { ...data };

  try {
    // Try email first
    if (donor.email) {
      try {
        const emailData = template.email(notificationData);
        await sendEmailNotification(
          donor.email,
          emailData.subject,
          emailData.html
        );
        console.log(`Email notification sent to donor ${donor.email}`);
        return;
      } catch (emailError) {
        console.error('Donor email failed:', emailError);
      }
    }

    // Fallback to SMS if phone exists
    if (donor.phone) {
      try {
        const smsMessage = template.whatsapp(notificationData).replace(/\*/g, '');
        await sendSMSNotification(donor.phone, smsMessage);
        console.log(`SMS notification sent to donor ${donor.phone}`);
        return;
      } catch (smsError) {
        console.error('Donor SMS failed:', smsError);
      }
    }

    throw new Error('All donor notification methods failed');

  } catch (error) {
    console.error('Donor notification service error:', error);
    throw error;
  }
};

module.exports = {
  sendNotification,
  sendDonorNotification,
  sendWhatsAppNotification,
  sendSMSNotification,
  sendEmailNotification
};
