require("dotenv").config(); // Load environment variables
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON requests

// Configure CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // URL of your frontend
    credentials: true, // Allow credentials (cookies, etc.)
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

// Example user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// YouTube Routes
app.use("/api/youtube", require("./routes/youtubeRoutes"));

// Layout Routes (New)
app.use("/api/layout", require("./routes/layoutRoutes"));

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
