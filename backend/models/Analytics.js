import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    event: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    metadata: {
      type: Object,
      default: {}
    },
    time: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
