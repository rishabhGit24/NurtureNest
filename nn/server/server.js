const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const donationRoutes = require("./routes/donationRoutes"); // Import new donation routes
const authMiddleware = require("./middleware/auth"); // Import the auth middleware
const app = express();

const cookieParser = require("cookie-parser"); // Import cookie-parser

app.use(cookieParser());
app.use(
  cors({
    origin: true, // Allow requests from all origins
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allow these HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allow these headers
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this to parse URL-encoded bodies for Twilio webhooks

mongoose
  .connect("mongodb+srv://bruhistg:b7iujgWky5C0GbWU@cluster0try.mipvwi4.mongodb.net/nurturenest?retryWrites=true&w=majority&appName=Cluster0try")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use("/api/auth", authRoutes);
app.use("/api/donations", donationRoutes); // Mount donation routes

// Example of a protected route
app.get("/api/home", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the home page!" });
});

// New route for Twilio WhatsApp webhook
app.post("/api/donations/response", async (req, res) => {
  const { Body, From } = req.body; // Twilio webhook payload: message body and sender number
  console.log("Received WhatsApp response:", { Body, From });

  try {
    const phoneNumber = From.replace("whatsapp:", ""); // Extract the phone number (e.g., +919108678540)
    const response = Body.trim().toUpperCase(); // Normalize the response (CONFIRM or CANCEL)

    // Find the organization based on the phone number from locations.json
    const loadLocations = () => {
      const locationsPath = path.join(__dirname, "./data/locations.json");
      try {
        return JSON.parse(fs.readFileSync(locationsPath, "utf8"));
      } catch (error) {
        console.error("Error loading locations.json:", error);
        if (error.code === "ENOENT") {
          console.warn(
            "locations.json not found. Creating an empty array as fallback."
          );
          return []; // Fallback if file is missing
        }
        throw error; // Re-throw other errors
      }
    };

    const locationsData = loadLocations();
    const organization = locationsData.find(
      (org) => `whatsapp:+91${org.number.replace(/^0/, "")}` === From
    );

    if (!organization) {
      console.warn(`No organization found for phone number: ${From}`);
      return res.status(404).send("Organization not found.");
    }

    // Find the latest donation request for this organization (simplified logic)
    const FoodDonation = require("./models/FoodDonation");
    const donation = await FoodDonation.findOne({
      donorOrganization: organization.name,
    }).sort({ createdAt: -1 });

    if (!donation) {
      console.warn(`No donation found for organization: ${organization.name}`);
      return res.status(404).send("No donation request found.");
    }

    let responseMessage;
    if (response === "CONFIRM") {
      donation.status = "confirmed";
      responseMessage = `The order for ${donation.quantity} is confirmed. Thank you for your response! If you need assistance, contact us at support@nurturenest.org or +91-9876543210.`;
    } else if (response === "CANCEL") {
      donation.status = "canceled";
      responseMessage = `The order for ${donation.quantity} has been canceled. If you have questions, contact us at support@nurturenest.org or +91-9876543210.`;
    } else {
      responseMessage = `Invalid response. Please reply with "CONFIRM" to accept or "CANCEL" to decline the donation request.`;
    }

    await donation.save(); // Update the donation status in MongoDB

    // Send custom response via WhatsApp
    const sendWhatsAppMessage = require("./services/twilioService");
    await sendWhatsAppMessage(From, responseMessage);

    res.status(200).send("Response processed successfully.");
  } catch (error) {
    console.error("Error processing WhatsApp response:", error);
    res.status(500).send("Error processing response.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
