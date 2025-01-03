const express = require("express");
const { saveLayout, getLayout } = require("../controllers/layoutController");
const requireAuth = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/save", requireAuth, saveLayout);
router.get("/get", requireAuth, getLayout);

module.exports = router;
