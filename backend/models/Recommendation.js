const mongoose = require("mongoose");

const RecommendationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  items: Array,
  source: String
}, { timestamps: true });

module.exports = mongoose.model("Recommendation", RecommendationSchema);
