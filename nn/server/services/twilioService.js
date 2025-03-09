const accountSid = "AC4e481ffac6304159f0f653e097595c99";
const authToken = "2cbfa198df12403557648babda0b463c";
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
