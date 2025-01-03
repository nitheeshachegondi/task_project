const express = require("express");
const {
  getAuthURL,
  getPlaylists,
  getPlaylistVideos, // Import the getPlaylistVideos function
} = require("../controllers/youtubeController");
const requireAuth = require("../middleware/requireAuth"); // Import the requireAuth middleware

const router = express.Router();

// Route to get the YouTube OAuth2 authorization URL
router.get("/auth-url", (req, res) => {
  const url = getAuthURL();
  res.json({ url });
});

// Route to get the user's playlists using the access token
router.get("/playlists", async (req, res) => {
  const token = req.headers.authorization;
  try {
    const playlists = await getPlaylists(token);
    res.json({ playlists });
  } catch (error) {
    res.status(500).json({ message: "Error fetching playlists" });
  }
});

// Add the OAuth2 callback route
router.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_URL}/?token=${tokens.access_token}`);
  } catch (error) {
    res.status(500).json({ message: "Error during OAuth callback" });
  }
});

// Add the route to get videos from a specific playlist
router.get("/playlists/:id/videos", requireAuth, getPlaylistVideos); // Apply requireAuth middleware

module.exports = router;
