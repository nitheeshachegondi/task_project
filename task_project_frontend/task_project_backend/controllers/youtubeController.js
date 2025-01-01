const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

// Initialize OAuth2 Client
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Generate Auth URL
exports.getAuthURL = () => {
  const scopes = ["https://www.googleapis.com/auth/youtube.readonly"];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  return url;
};

// Get YouTube Playlists
exports.getPlaylists = async (token) => {
  oauth2Client.setCredentials({ access_token: token });
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });
  const res = await youtube.playlists.list({
    part: "snippet,contentDetails",
    mine: true,
    maxResults: 25,
  });
  return res.data.items;
};

// Get Playlist Videos
exports.getPlaylistVideos = async (req, res) => {
  const playlistId = req.params.id;
  const token = req.headers.authorization;

  try {
    // Set the access token in OAuth2 client
    oauth2Client.setCredentials({ access_token: token });

    // Create the YouTube API client
    const youtube = google.youtube({ version: "v3", auth: oauth2Client });

    // Fetch the videos from the playlist
    const resVideos = await youtube.playlistItems.list({
      part: "snippet,contentDetails",
      playlistId: playlistId,
      maxResults: 10, // Limit to 10 results, adjust as needed
    });

    // Return the list of videos
    res.json({ videos: resVideos.data.items });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Error fetching videos" });
  }
};
