import express from "express";
import {
  getAnalytics,
  getMlAnalytics,
  createAnalytics,
  getAnalyticsSummary
} from "../controllers/analyticsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get analytics data
router.get("/", protect, getAnalytics);

// Get ML-based analytics and insights
router.get("/ml/insights", protect, getMlAnalytics);

// Get analytics summary
router.get("/summary", protect, getAnalyticsSummary);

// Create new analytics record
router.post("/", protect, createAnalytics);

export default router;
