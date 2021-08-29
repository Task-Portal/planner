const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: "Name is required" },
  created: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "Owner is required",
  },
});

module.exports = mongoose.model("Board", BoardSchema);
