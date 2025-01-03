const Layout = require("../models/Layout");

// @desc    Save layout
// @route   POST /api/layout/save
// @access  Private
exports.saveLayout = async (req, res) => {
  const { playlists } = req.body;
  try {
    let layout = await Layout.findOne({ user: req.user.id });
    if (layout) {
      layout.playlists = playlists;
    } else {
      layout = new Layout({ user: req.user.id, playlists });
    }
    await layout.save();
    res.status(200).json({ message: "Layout saved" });
  } catch (error) {
    res.status(500).json({ message: "Error saving layout" });
  }
};

// @desc    Get layout
// @route   GET /api/layout/get
// @access  Private
exports.getLayout = async (req, res) => {
  try {
    const layout = await Layout.findOne({ user: req.user.id });
    if (layout) {
      res.json({ playlists: layout.playlists });
    } else {
      res.status(404).json({ message: "No layout found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching layout" });
  }
};
