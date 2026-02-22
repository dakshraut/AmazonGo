import { useEffect, useState } from "react";
import { useContext } from "react";
import { RecommendationContext } from "../context/RecommendationContext";
import { Loader } from "../components/Loader";
import ProductCard from "../components/ProductCard";

export default function Recommendations(){
  const { recommendations, loadRecommendations } = useContext(RecommendationContext);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{ 
    const init = async () => {
      await loadRecommendations();
      setLoading(false);
    };
    init();
  },[]);

  if (loading) return <Loader />;

  return (
    <div className="main-content">
      <div className="dashboard-header">
        <h1>🤖 AI-Powered Recommendations</h1>
        <p>Products specifically chosen for you based on your shopping history and preferences</p>
      </div>

      {recommendations && recommendations.length > 0 ? (
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
          <p>Make some purchases to get personalized recommendations!</p>
        </div>
      )}
    </div>
  )
}