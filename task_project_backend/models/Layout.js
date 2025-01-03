const mongoose = require("mongoose");

const LayoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    playlists: { type: Array, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Layout", LayoutSchema);
