import api from "./api";

export const getRecommendations = async () => {
  try {
    const response = await api.get("/recommendations");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return [];
  }
};

const recommendationService = {
  getRecommendations,
};

export default recommendationService;