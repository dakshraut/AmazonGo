# Inference pipeline orchestration
import pickle
import os
from app.config import HYBRID_MODEL

def load_model():
    """Load the trained hybrid model."""
    if not os.path.exists(HYBRID_MODEL):
        raise FileNotFoundError(f"Model not found at {HYBRID_MODEL}")
    
    with open(HYBRID_MODEL, "rb") as f:
        return pickle.load(f)

def recommend(product_name):
    """Generate recommendations for a given product."""
    try:
        model = load_model()
        popularity = model["popularity"]
        recommendations = popularity.index.tolist()[:10]  # Return top 10
        return recommendations
    except Exception as e:
        return []

def analyze(data):
    """Analyze input data using the trained models."""
    try:
        if not isinstance(data, dict):
            return {"error": "Input data must be a dictionary"}
        
        model = load_model()
        
        # Extract analysis metrics
        analysis_result = {
            "status": "success",
            "recommendation_count": len(model["popularity"]),
            "models_loaded": list(model.keys())
        }
        return analysis_result
    except Exception as e:
        return {"error": str(e), "status": "failed"}
