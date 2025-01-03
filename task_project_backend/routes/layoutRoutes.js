const express = require("express");
const router = express.Router();

// Auth Controllers
const { loginUser } = require("../controllers/authController");

// Layout Controllers
const { saveLayout, getLayout } = require("../controllers/layoutController");

// Middleware
const requireAuth = require("../middlewares/authMiddleware");

// Auth Routes
router.get("/login", loginUser);

// Layout Routes
router.post("/save", requireAuth, saveLayout);
router.get("/get", requireAuth, getLayout);

module.exports = router;
