import express from "express";
import {
  getRecommendations,
  getPersonalizedRecommendations,
  getRecommendationHistory
} from "../controllers/recommendationController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get recommendations based on cart items (no auth required - cart page already protected)
router.post("/", getRecommendations);

// Get personalized recommendations for a user (protected)
router.get("/:userId", protect, getPersonalizedRecommendations);

// Get recommendation history for a user (protected)
router.get("/:userId/history", protect, getRecommendationHistory);

export default router;
