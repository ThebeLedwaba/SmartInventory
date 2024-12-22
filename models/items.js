// models/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ["in-stock", "out-of-stock"], default: "in-stock" },
});

module.exports = mongoose.model("Item", ItemSchema);
