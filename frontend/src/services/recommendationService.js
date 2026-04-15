import api from "./api";

export const getRecommendations = async (cartItems, userId) => {
  try {
    // Validate and clean cart items
    const validCartItems = cartItems.filter(item => {
      if (!item._id) {
        console.warn("Cart item missing _id:", item);
        return false;
      }
      if (!item.category) {
        console.warn("Cart item missing category:", item);
        return false;
      }
      return true;
    });

    // Debug logging
    console.log("getRecommendations called with:", {
      cartItemsCount: validCartItems.length,
      cartItems: validCartItems.map(item => ({
        _id: item._id,
        name: item.name,
        category: item.category
      })),
      userId
    });

    if (validCartItems.length === 0) {
      console.warn("No valid cart items to send to recommendations API");
      return {
        success: true,
        data: {
          recommendations: [],
          message: "Cart items missing required fields"
        }
      };
    }

    const requestBody = {
      cartItems: validCartItems,
      userId: userId || null
    };

    console.log("Sending to /api/recommendations:", requestBody);

    const response = await api.post("/recommendations", requestBody);
    
    console.log("Response from /api/recommendations:", response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    console.error("Error details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    
    return {
      success: false,
      data: {
        recommendations: [],
        message: error.message
      }
    };
  }
};

export const getRecommendationHistory = async (userId) => {
  try {
    const response = await api.get(`/recommendations/${userId}/history`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendation history:", error);
    return {
      success: false,
      data: []
    };
  }
};

const recommendationService = {
  getRecommendations,
  getRecommendationHistory
};

export default recommendationService;