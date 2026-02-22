import React, { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendationService";
import ProductCard from "./ProductCard";

const SuggestionPanel = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const res = await getRecommendations();
      setSuggestions(res.data || []);
    } catch (err) {
      console.error("Recommendation error", err);
    }
  };

  return (
    <div className="suggestion-panel">
      <h2>Recommended for you</h2>

      <div className="suggestion-grid">
        {suggestions.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default SuggestionPanel;