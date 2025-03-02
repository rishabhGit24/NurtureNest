const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

router.post("/food", donationController.createFoodDonation);

module.exports = router;
