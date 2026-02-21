const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  tags: [String]
});

module.exports = mongoose.model("Product", ProductSchema);
