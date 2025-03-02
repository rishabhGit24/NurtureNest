const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

router.post("/:category", donationController.createDonation); // Handle all categories dynamically

module.exports = router;
