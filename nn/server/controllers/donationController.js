const Donation = require("../models/foodDonation"); // Use a single model for all donations
const sendWhatsAppMessage = require("../services/twilioService");
const path = require("path");
const fs = require("fs");

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
      return [];
    }
    throw error;
  }
};

const locationsData = loadLocations();

exports.createDonation = async (req, res) => {
  try {
    const { category } = req.params; // Get category from URL
    const {
      quantity,
      type,
      description,
      donorName,
      email,
      donorOrganization,
      donorPhone,
    } = req.body;

    if (
      !quantity ||
      !type ||
      !description ||
      !donorName ||
      !email ||
      !donorOrganization ||
      !donorPhone
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const donation = new Donation({
      category, // Store the category (e.g., 'food', 'clothes')
      quantity,
      type,
      description,
      donorName,
      email,
      donorOrganization,
      donorPhone,
      status: "pending",
    });

    await donation.save();

    const organization = locationsData.find(
      (org) => org.name === donorOrganization
    );
    if (organization && organization.number) {
      const phoneNumber = `whatsapp:+91${organization.number.replace(
        /^0/,
        ""
      )}`;
      const message = `Hello ${donorOrganization},\n\nGreetings from NurtureNest! We’ve received a ${category} donation request for your organization. Please review the details below and let us know your decision:\n\nQuantity: ${quantity}\nType: ${type}\nDescription: ${description}\nDonor: ${donorName}\nEmail: ${email}\nOrganization: ${donorOrganization}\n\nTo proceed, please reply with:\n- "CONFIRM" to accept this donation request, or\n- "CANCEL" to decline it.\n\nIf you need any assistance or have questions, feel free to contact us at support@nurturenest.org or +91-9876543210. We look forward to your response.\n\nBest regards,\nThe NurtureNest Team`;

      await sendWhatsAppMessage(phoneNumber, message);
    } else {
      console.warn(
        `No phone number found for organization: ${donorOrganization}`
      );
    }

    res.status(201).json({
      message: `Donation request submitted successfully and WhatsApp confirmation sent (if number available)`,
      data: donation,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error submitting donation request",
      error: error.message,
    });
  }
};
