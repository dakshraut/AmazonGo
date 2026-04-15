import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false
  },
  items: Array,
  source: String,
  cartItems: Array,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);

export default Recommendation;
