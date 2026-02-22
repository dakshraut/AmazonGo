import { createContext, useState } from "react";
import { getRecommendations } from "../services/recommendationService";

export const RecommendationContext = createContext();

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState([]);

  const loadRecommendations = async () => {
    const data = await getRecommendations();
    setRecommendations(data);
  };

  return (
    <RecommendationContext.Provider value={{ recommendations, loadRecommendations }}>
      {children}
    </RecommendationContext.Provider>
  );
};