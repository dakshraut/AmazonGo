import { useContext } from "react";
import { RecommendationContext } from "../context/RecommendationContext.jsx";

export const useRecommendation = () => useContext(RecommendationContext);
