import { useContext } from "react";
import { RecommendationContext } from "../context/RecommendationContext.jsx";

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error('useRecommendation must be used within a RecommendationProvider');
  }
  return context;
};
