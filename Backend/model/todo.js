const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
  },
  { timestamps: true } // ✅ Enables createdAt/updatedAt
);

module.exports = mongoose.model("Todo", todoSchema);
