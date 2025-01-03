const express = require("express");
const router = express.Router();

// Importing the required controllers
const {
  sendOTP,
  verifyOTP,
  loginUser,
} = require("../controllers/authController");

// Routes for OTP
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// Route for Login
router.get("/login", loginUser);

module.exports = router;
