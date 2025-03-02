const accountSid = "AC3a06733103752dc5dfa1d346c2134021";
const authToken = "56357b823790badf3fb38b024c49649b";
const client = require("twilio")(accountSid, authToken);

const sendWhatsAppMessage = async (to, message) => {
  try {
    const response = await client.messages.create({
      from: "whatsapp:+14155238886", // Replace with your Twilio WhatsApp-enabled number
      body: message, // Use 'body' for simple text messages
      to: to, // Recipient WhatsApp number (e.g., 'whatsapp:+919108678540')
    });
    console.log(
      "WhatsApp message sent successfully for donation organization. SID:",
      response.sid
    );
    return response;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
};

module.exports = sendWhatsAppMessage;
