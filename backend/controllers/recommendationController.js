import Recommendation from "../models/Recommendation.js";
import Product from "../models/Product.js";
import * as mlService from "../services/mlService.js";
import logger from "../utils/logger.js";
import { ObjectId } from "mongodb";

/**
 * Helper function to convert string IDs to valid MongoDB ObjectIds
 */
const toObjectId = (id) => {
  try {
    if (!id) return null;
    // If already an ObjectId, return as is
    if (id instanceof ObjectId) return id;
    // Try to convert string to ObjectId
    if (ObjectId.isValid(id)) {
      return new ObjectId(id);
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Get product recommendations based on user's cart items (category-based)
 */
export const getRecommendations = async (req, res) => {
  try {
    const { cartItems, userId } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          userId,
          recommendations: [],
          source: "category-based",
          message: "No cart items to generate recommendations"
        }
      });
    }

    // Extract unique categories from cart items
    const cartItemCategories = [...new Set(
      cartItems
        .map(item => item.category)
        .filter(cat => cat) // Remove undefined/null
    )];

    if (cartItemCategories.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          userId,
          recommendations: [],
          source: "category-based",
          message: "Cart items have no categories"
        }
      });
    }

    // Get product IDs from cart items and convert to valid ObjectIds
    const cartItemIds = cartItems
      .map(item => toObjectId(item._id || item.productId))
      .filter(Boolean); // Only keep valid ObjectIds

    // Get recommendations per category for balanced results
    const itemsPerCategory = Math.ceil(10 / cartItemCategories.length);
    const recommendedProducts = [];

    for (const category of cartItemCategories) {
      try {
        const categoryProducts = await Product.find({
          category: category,
          _id: { $nin: cartItemIds },
          stock: { $gt: 0 } // Only products in stock
        })
          .sort({ rating: -1, _id: -1 }) // Sort by rating, then by newest
          .limit(itemsPerCategory + 2)
          .lean();

        // Add top items from this category to recommendations
        recommendedProducts.push(...categoryProducts.slice(0, itemsPerCategory));
      } catch (categoryError) {
        logger.warn("Error fetching products for category", {
          category,
          error: categoryError.message
        });
        // Continue with next category if one fails
        continue;
      }
    }

    // Remove duplicates (shouldn't happen, but just in case)
    const uniqueProducts = Array.from(
      new Map(recommendedProducts.map(p => [p._id.toString(), p])).values()
    );

    // Sort by rating for best recommendations
    const sorted = uniqueProducts.sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return 0;
    });

    // Limit to 10 items max
    const finalRecommendations = sorted.slice(0, 10);

    logger.info("Recommendations retrieved", {
      userId,
      cartItemsCount: cartItems.length,
      categoriesCount: cartItemCategories.length,
      recommendationsCount: finalRecommendations.length
    });

    // Save recommendation record to database
    if (finalRecommendations.length > 0) {
      await Recommendation.create({
        userId,
        items: finalRecommendations.map(p => p._id),
        source: "category-based",
        cartItems: cartItemIds,
        categories: cartItemCategories,
        createdAt: new Date()
      });
    }

    res.status(200).json({
      success: true,
      data: {
        userId,
        recommendations: finalRecommendations,
        source: "category-based",
        categories: cartItemCategories,
        message: `Found ${finalRecommendations.length} related products from ${cartItemCategories.length} categories`
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
