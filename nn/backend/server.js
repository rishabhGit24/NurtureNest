const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/auth"); // Import auth routes
const twilio = require("twilio");

// Twilio configuration
const accountSid = "AC4e481ffac6304159f0f653e097595c99"; // Replace with your Twilio Account SID
const authToken = "your_auth_token"; // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

app.use(cors({ origin: "http://localhost:3000" })); // Allow requests from your frontend
app.use(express.json()); // Parse JSON requests

mongoose
  .connect("mongodb://localhost:27017/my_database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api/auth", authRoutes);

// Endpoint to handle booking and send WhatsApp message
app.post("/api/bookings", async (req, res) => {
  const { orphanageName, phoneNumber, message } = req.body;

  if (!orphanageName || !phoneNumber || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Send WhatsApp Message
    const whatsappMessage = await client.messages.create({
      body: `New Booking Alert for ${orphanageName}: ${message}`,
      from: "whatsapp:+14155238886", // Twilio WhatsApp Sandbox number
      to: `whatsapp:${phoneNumber}`, // Recipient's WhatsApp number
    });

    console.log("WhatsApp Message SID:", whatsappMessage.sid);

    return res
      .status(200)
      .json({
        message: "Booking and WhatsApp notification sent successfully!",
      });
  } catch (error) {
    console.error("Twilio WhatsApp Error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to send WhatsApp notification." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
