const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  content: { type: String, trim: true, required: "Content is required." },
  image: { data: Buffer, contentType: String },
  availableImages: {
    type: Boolean,
    default: false,
  },
  description: { type: String, trim: true },
  created: { type: Date, default: Date.now },

  backgroundColor: { type: String, default: "#ffffff" },
  fontColor: { type: String, default: "#000000" },

  updated: { type: Date, default: Date.now },
  status: {
    type: String,
    default: "None",
    enum: ["High", "Medium", "Low", "None"],
  },
  startDay: { type: Date, default: Date.now },
  finishDay: { type: Date, default: Date.now },
  boardId: {
    type: mongoose.Schema.ObjectId,
    ref: "Board",
    required: "board is required",
  },
  position: { type: Number },
});

module.exports = mongoose.model("Task", taskSchema);
