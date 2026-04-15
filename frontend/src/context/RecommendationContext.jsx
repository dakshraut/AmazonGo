import { createContext, useState, useCallback } from "react";
import { getRecommendations } from "../services/recommendationService";

export const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadRecommendations = useCallback(async (cartItems, userId) => {
    console.log("loadRecommendations called");
    
    if (!cartItems || cartItems.length === 0) {
      console.log("No cart items, setting empty recommendations");
      setRecommendations([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("Calling getRecommendations service...");
      const data = await getRecommendations(cartItems, userId);
      
      console.log("Received data from service:", data);
      
      if (data.success && data.data.recommendations) {
        console.log("Setting recommendations:", data.data.recommendations);
        setRecommendations(data.data.recommendations);
      } else {
        console.log("No recommendations in response or not successful");
        setRecommendations([]);
      }
    } catch (err) {
      console.error("Error loading recommendations:", err);
      setError(err.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRecommendations = useCallback(() => {
    setRecommendations([]);
  }, []);

  const value = {
    recommendations,
    loading,
    error,
    loadRecommendations,
    clearRecommendations
  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};