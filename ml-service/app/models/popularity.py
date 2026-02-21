# Popularity-based recommendation model
import pickle
import os

def train_popularity(df, save_path):
    """Train popularity-based model."""
    try:
        if df is None or df.empty:
            raise ValueError("DataFrame cannot be empty")
        
        if 'product' not in df.columns:
            raise ValueError("DataFrame must contain 'product' column")
        
        popularity = df['product'].value_counts().head(10)
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        with open(save_path, "wb") as f:
            pickle.dump(popularity, f)
        
        return popularity
    except Exception as e:
        raise RuntimeError(f"Failed to train popularity model: {str(e)}")
