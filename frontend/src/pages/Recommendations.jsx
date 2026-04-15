import { useEffect, useState } from "react";
import { useCart } from "../hooks/useCart";
import { useRecommendation } from "../hooks/useRecommendation";
import { useAuth } from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import ProductCard from "../components/ProductCard";

export default function Recommendations(){
  const { cartItems } = useCart();
  const { user } = useAuth();
  const { recommendations, loading, loadRecommendations } = useRecommendation();
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(()=>{ 
    const init = async () => {
      setInitialLoad(true);
      if (cartItems && cartItems.length > 0) {
        // Use uid for Firebase users, _id for backend users, or null as fallback
        const userId = user?.uid || user?._id || user?.id || null;
        await loadRecommendations(cartItems, userId);
      }
      setInitialLoad(false);
    };
    init();
  }, []);

  if (initialLoad || loading) return <Loader />;

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h1>🤖 AI-Powered Recommendations</h1>
        <p>Products specifically chosen for you based on your shopping cart</p>
      </div>

      {cartItems && cartItems.length === 0 ? (
        <div style={{textAlign: 'center', padding: '60px 20px', color: '#666'}}>
          <h2>Add items to your cart</h2>
          <p>Your cart is empty. Add some products to get personalized recommendations!</p>
        </div>
      ) : recommendations && recommendations.length > 0 ? (
        <div className="suggestion-panel">
          <h3>✨ Recommended For You</h3>
          <div className="product-grid">
            {recommendations.map(r=>(
              <ProductCard key={r._id} product={r} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{textAlign: 'center', padding: '60px 20px', color: '#666'}}>
          <h2>No recommendations yet</h2>
          <p>Add some items to your cart to get personalized recommendations!</p>
        </div>
      )}
    </div>
  )
}