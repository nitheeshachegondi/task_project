// userRoutes.js

const express = require("express");
const router = express.Router();

// Import necessary controllers
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

// Middleware for authentication
const { authMiddleware } = require("../middlewares/authMiddleware");

// Define user routes
// Get user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update user profile
router.put("/profile", authMiddleware, updateUserProfile);

// Delete user profile
router.delete("/profile", authMiddleware, deleteUserProfile);

module.exports = router;
