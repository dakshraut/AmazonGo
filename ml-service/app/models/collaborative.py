# Collaborative filtering implementation
from sklearn.neighbors import NearestNeighbors
import pickle
import os

def train_collaborative(matrix, save_path):
    """Train collaborative filtering model using KNN."""
    try:
        if matrix is None or matrix.empty:
            raise ValueError("Matrix data cannot be empty")
        
        model = NearestNeighbors(metric='cosine', algorithm='brute')
        model.fit(matrix)
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        with open(save_path, "wb") as f:
            pickle.dump(model, f)
        
        return model
    except Exception as e:
        raise RuntimeError(f"Failed to train collaborative filtering model: {str(e)}")
