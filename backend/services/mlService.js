import axios from "axios";
import logger from "../utils/logger.js";

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:8000";
const ML_API_TIMEOUT = 30000; // 30 seconds

// Create axios instance with timeout
const mlClient = axios.create({
  baseURL: ML_SERVICE_URL,
  timeout: ML_API_TIMEOUT,
  headers: {
    "Content-Type": "application/json"
  }
});

/**
 * Health check for ML service
 */
export const checkMLServiceHealth = async () => {
  try {
    const response = await mlClient.get("/health");
    logger.info("ML Service health check passed", { status: response.data.status });
    return { healthy: true, status: response.data };
  } catch (error) {
    logger.error("ML Service health check failed", {
      error: error.message,
      url: `${ML_SERVICE_URL}/health`
    });
    return { healthy: false, error: error.message };
  }
};

/**
 * Get recommendations from ML service
 * @param {Array} purchasedItems - Items purchased by user
 * @param {String} userId - User ID for personalization
 * @returns {Promise<Array>} - Recommended products
 */
export const getRecommendations = async (purchasedItems, userId = null) => {
  try {
    if (!purchasedItems || purchasedItems.length === 0) {
      logger.warn("No purchased items provided for recommendations", { userId });
      return [];
    }

    logger.info("Requesting recommendations from ML service", {
      itemCount: purchasedItems.length,
      userId
    });

    const response = await mlClient.post("/api/recommend", {
      user_id: userId || null,
      purchased_items: purchasedItems
    });

    logger.info("Recommendations received from ML service", {
      recommendedCount: response.data.recommended_items?.length,
      userId
    });

    return response.data.recommended_items || [];
  } catch (error) {
    logger.error("Failed to get recommendations from ML service", {
      error: error.message,
      itemCount: purchasedItems?.length,
      userId,
      url: `${ML_SERVICE_URL}/api/recommend`
    });
    return [];
  }
};

/**
 * Get analytics from ML service
 * @param {Object} data - Data to analyze
 * @returns {Promise<Object>} - Analysis results
 */
export const getAnalytics = async (data) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      logger.warn("No data provided for analytics");
      return { analysis: {} };
    }

    logger.info("Requesting analytics from ML service", {
      dataKeys: Object.keys(data)
    });

    const response = await mlClient.post("/api/analyze", data);

    logger.info("Analytics received from ML service", {
      hasAnalysis: !!response.data.analysis
    });

    return response.data;
  } catch (error) {
    logger.error("Failed to get analytics from ML service", {
      error: error.message,
      url: `${ML_SERVICE_URL}/api/analyze`
    });
    return { analysis: {}, error: error.message };
  }
};

/**
 * Train or retrain ML models
 * @param {Object} trainingData - Data for training
 * @returns {Promise<Object>} - Training result
 */
export const trainModels = async (trainingData) => {
  try {
    if (!trainingData || Object.keys(trainingData).length === 0) {
      logger.warn("No training data provided");
      return { success: false, error: "No training data provided" };
    }

    logger.info("Initiating model training", {
      dataKeys: Object.keys(trainingData)
    });

    const response = await mlClient.post("/api/train", trainingData);

    logger.info("Model training completed", {
      status: response.data.status
    });

    return response.data;
  } catch (error) {
    logger.error("Failed to train models in ML service", {
      error: error.message,
      url: `${ML_SERVICE_URL}/api/train`
    });
    return { success: false, error: error.message };
  }
};

/**
 * Get model status from ML service
 * @returns {Promise<Object>} - Model status information
 */
export const getModelStatus = async () => {
  try {
    logger.info("Checking ML service model status");

    const response = await mlClient.get("/api/models/status");

    logger.info("Model status retrieved", {
      models: Object.keys(response.data)
    });

    return response.data;
  } catch (error) {
    logger.error("Failed to get model status from ML service", {
      error: error.message,
      url: `${ML_SERVICE_URL}/api/models/status`
    });
    return { error: error.message };
  }
};

export default {
  checkMLServiceHealth,
  getRecommendations,
  getAnalytics,
  trainModels,
  getModelStatus
};
