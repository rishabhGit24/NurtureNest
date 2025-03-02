const mongoose = require("mongoose");

const foodDonationSchema = new mongoose.Schema({
  quantity: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  donorOrganization: {
    // Updated from donorNumber to donorOrganization
    type: String, // Storing organization name
    required: true,
  },
  status: {
    // Add status field
    type: String,
    default: "pending", // Default to 'pending' until confirmed or canceled
    enum: ["pending", "confirmed", "canceled"], // Valid status values
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FoodDonation", foodDonationSchema);
