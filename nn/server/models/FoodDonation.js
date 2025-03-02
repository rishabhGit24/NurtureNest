const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ["food", "clothes", "education", "medical", "money"], // Valid categories
  },
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
    type: String,
    required: true,
  },
  donorPhone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "confirmed", "canceled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
