import Recommendation from "../models/Recommendation.js";
import * as mlService from "../services/mlService.js";
import logger from "../utils/logger.js";

/**
 * Get product recommendations based on user's cart items
 */
export const getRecommendations = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        error: "Cart items are required",
        message: "Please provide at least one item in your cart"
      });
    }

    // Get recommendations from ML service
    const recommendations = await mlService.getRecommendations(
      cartItems.map(item => item.productId || item),
      userId
    );

    logger.info("Recommendations retrieved", {
      userId,
      cartItemsCount: cartItems.length,
      recommendationsCount: recommendations.length
    });

    // Save recommendation record to database
    const rec = await Recommendation.create({
      userId,
      items: recommendations,
      source: "hybrid-ml",
      cartItems: cartItems,
      createdAt: new Date()
    });

    res.status(200).json({
      success: true,
      data: {
        userId,
        recommendations: recommendations || [],
        source: "hybrid-ml",
        generatedAt: rec.createdAt,
        recordId: rec._id
      }
    });
  } catch (error) {
    logger.error("Failed to get recommendations", {
      error: error.message,
      userId: req.body.userId
    });

    res.status(500).json({
      error: "Failed to get recommendations",
      message: error.message,
      code: "RECOMMENDATION_ERROR"
    });
  }
};

/**
 * Get personalized recommendations based on user history
 */
export const getPersonalizedRecommendations = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: "User ID is required"
      });
    }

    // Fetch recent purchases or cart items for the user
    const recentRecommendations = await Recommendation.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!recentRecommendations) {
      return res.status(404).json({
        message: "No recommendation history found for this user",
        data: []
      });
    }

    res.status(200).json({
      success: true,
      data: recentRecommendations
    });
  } catch (error) {
    logger.error("Failed to fetch personalized recommendations", {
      error: error.message,
      userId: req.params.userId
    });

    res.status(500).json({
      error: "Failed to fetch recommendations",
      message: error.message
    });
  }
};

/**
 * Get recommendation history for a user
 */
export const getRecommendationHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    if (!userId) {
      return res.status(400).json({
        error: "User ID is required"
      });
    }

    const history = await Recommendation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      success: true,
      count: history.length,
      data: history
    });
  } catch (error) {
    logger.error("Failed to fetch recommendation history", {
      error: error.message,
      userId: req.params.userId
    });

    res.status(500).json({
      error: "Failed to fetch history",
      message: error.message
    });
  }
};

export default {
  getRecommendations,
  getPersonalizedRecommendations,
  getRecommendationHistory
};
