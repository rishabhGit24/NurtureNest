const FoodDonation = require("../models/FoodDonation");
const sendWhatsAppMessage = require("../services/twilioService"); // Import Twilio service
const path = require("path");
const fs = require("fs");

// Load locations.json with error handling
const loadLocations = () => {
  const locationsPath = path.join(__dirname, "../data/locations.json");
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

exports.createFoodDonation = async (req, res) => {
  try {
    const { quantity, type, description, donorName, email, donorOrganization } =
      req.body;

    // Validate required fields
    if (
      !quantity ||
      !type ||
      !description ||
      !donorName ||
      !email ||
      !donorOrganization
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new donation document
    const foodDonation = new FoodDonation({
      quantity,
      type,
      description,
      donorName,
      email,
      donorOrganization,
      status: "pending", // Add initial status
    });

    // Save to MongoDB
    await foodDonation.save();

    // Find the phone number for the donor organization from locations.json
    const organization = locationsData.find(
      (org) => org.name === donorOrganization
    );
    if (organization && organization.number) {
      const phoneNumber = `whatsapp:+91${organization.number.replace(
        /^0/,
        ""
      )}`; // Format for WhatsApp (Indian numbers, remove leading 0 if present)
      const message = `Hello ${donorOrganization},\n\nGreetings from NurtureNest! We’ve received a donation request for your organization. Please review the details below and let us know your decision:\n\nQuantity: ${quantity}\nType: ${type}\nDescription: ${description}\nDonor: ${donorName}\nEmail: ${email}\nOrganization: ${donorOrganization}\n\nTo proceed, please reply with:\n- "CONFIRM" to accept this donation request, or\n- "CANCEL" to decline it.\n\nIf you need any assistance or have questions, feel free to contact us at support@nurturenest.org or +91-9876543210. We look forward to your response.\n\nBest regards,\nThe NurtureNest Team`;

      // Send WhatsApp message using Twilio
      await sendWhatsAppMessage(phoneNumber, message);
    } else {
      console.warn(
        `No phone number found for organization: ${donorOrganization}`
      );
    }

    res.status(201).json({
      message:
        "Donation request submitted successfully and WhatsApp confirmation sent (if number available)",
      data: foodDonation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting donation request",
      error: error.message,
    });
  }
};
