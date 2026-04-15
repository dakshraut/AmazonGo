import React, { useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { useRecommendation } from "../hooks/useRecommendation";
import { useAuth } from "../context/AuthContext";
import ProductCard from "./ProductCard";
import { Loader } from "./Loader";
import "./CartRecommendations.css";

const CartRecommendations = () => {
  const { cartItems } = useCart();
  const { user } = useAuth();
  const { recommendations, loading, error, loadRecommendations } = useRecommendation();

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      try {
        console.log("CartRecommendations: Loading recommendations for", cartItems.length, "items");
        
        // Validate cart items have required fields
        const validItems = cartItems.filter(item => {
          if (!item._id) {
            console.warn("Skipping cart item - missing _id:", item);
            return false;
          }
          if (!item.category) {
            console.warn("Skipping cart item - missing category:", item.name || item._id);
            return false;
          }
          return true;
        });

        if (validItems.length === 0) {
          console.warn("No valid cart items with _id and category for recommendations");
          loadRecommendations([], null);
          return;
        }

        // Use uid for Firebase users, _id for backend users, or null as fallback
        const userId = user?.uid || user?._id || user?.id || null;
        console.log("CartRecommendations: User ID:", userId);
        console.log("CartRecommendations: Valid items:", validItems.length);
        
        loadRecommendations(validItems, userId);
      } catch (err) {
        console.error("Error in CartRecommendations effect:", err);
      }
    }
  }, [cartItems, user, loadRecommendations]);

  // Debug logging
  useEffect(() => {
    console.log("CartRecommendations state:", { 
      cartItemsCount: cartItems?.length,
      loading,
      recommendationsCount: recommendations?.length,
      error 
    });
  }, [cartItems, loading, recommendations, error]);

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  // Always show the container, even while loading
  return (
    <div className="cart-recommendations-container">
      <div className="recommendations-header">
        <div className="header-content">
          <div className="header-icon">🎯</div>
          <div>
            <h3>Recommended For You</h3>
            <p>Similar items you might like based on your cart</p>
          </div>
        </div>
        <div className="header-badge">AI Powered</div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 20px', textAlign: 'center' }}>
          <Loader />
        </div>
      ) : error ? (
        <div className="recommendations-error">
          <p>⚠️ {error}</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>Check browser console for details</p>
        </div>
      ) : recommendations && recommendations.length > 0 ? (
        <div className="recommendations-grid">
          {recommendations.map((product) => {
            try {
              return <ProductCard key={product._id} product={product} />;
            } catch (err) {
              console.error("Error rendering product card:", err, product);
              return null;
            }
          })}
        </div>
      ) : (
        <div className="recommendations-empty">
          <p>No recommendations available at this moment</p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>Try refreshing the page or adding more items</p>
        </div>
      )}
    </div>
  );
};

export default CartRecommendations;
