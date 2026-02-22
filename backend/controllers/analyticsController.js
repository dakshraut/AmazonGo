import Analytics from "../models/Analytics.js";
import * as mlService from "../services/mlService.js";
import logger from "../utils/logger.js";

/**
 * Get analytics data from database
 */
export const getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, userId } = req.query;

    let query = {};

    if (userId) {
      query.userId = userId;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) {
        query.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        query.createdAt.$lte = new Date(endDate);
      }
    }

    const data = await Analytics.find(query)
      .sort({ createdAt: -1 })
      .lean();

    logger.info("Analytics retrieved", { count: data.length, userId });

    res.status(200).json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    logger.error("Failed to retrieve analytics", { error: error.message });
    res.status(500).json({
      error: "Failed to retrieve analytics",
      message: error.message
    });
  }
};

/**
 * Get ML-based analytics and insights
 */
export const getMlAnalytics = async (req, res) => {
  try {
    const { period = "30d" } = req.query;

    logger.info("Fetching ML-based analytics", { period });

    // Fetch aggregated data from database
    const analyticsData = await Analytics.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalRevenue: { $sum: "$revenue" },
          avgOrderValue: { $avg: "$orderValue" },
          uniqueUsers: { $addToSet: "$userId" }
        }
      }
    ]);

    if (!analyticsData || analyticsData.length === 0) {
      return res.status(200).json({
        success: true,
        data: {
          analysis: {},
          message: "No data available for analysis"
        }
      });
    }

    // Send aggregated data to ML service for deeper analysis
    const mlAnalysis = await mlService.getAnalytics({
      analytics: analyticsData[0],
      period
    });

    logger.info("ML Analytics retrieved successfully");

    res.status(200).json({
      success: true,
      data: {
        aggregated: analyticsData[0],
        analysis: mlAnalysis.analysis || {},
        period
      }
    });
  } catch (error) {
    logger.error("Failed to fetch ML analytics", { error: error.message });
    res.status(500).json({
      error: "Failed to fetch ML analytics",
      message: error.message
    });
  }
};

/**
 * Create analytics record
 */
export const createAnalytics = async (req, res) => {
  try {
    const { userId, eventType, data } = req.body;

    if (!userId || !eventType) {
      return res.status(400).json({
        error: "User ID and event type are required"
      });
    }

    const analytics = await Analytics.create({
      userId,
      eventType,
      data: data || {},
      createdAt: new Date()
    });

    logger.info("Analytics record created", { userId, eventType });

    res.status(201).json({
      success: true,
      data: analytics
    });
  } catch (error) {
    logger.error("Failed to create analytics record", { error: error.message });
    res.status(500).json({
      error: "Failed to create analytics",
      message: error.message
    });
  }
};

/**
 * Get analytics summary
 */
export const getAnalyticsSummary = async (req, res) => {
  try {
    const summary = await Analytics.aggregate([
      {
        $group: {
          _id: "$eventType",
          count: { $sum: 1 },
          lastRecorded: { $max: "$createdAt" }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    logger.info("Analytics summary retrieved");

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    logger.error("Failed to retrieve analytics summary", { error: error.message });
    res.status(500).json({
      error: "Failed to retrieve summary",
      message: error.message
    });
  }
};

export default {
  getAnalytics,
  getMlAnalytics,
  createAnalytics,
  getAnalyticsSummary
};
