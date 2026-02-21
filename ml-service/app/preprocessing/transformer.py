# Data transformation utilities
import pandas as pd

def normalize_ratings(df):
    """Normalize ratings using z-score normalization."""
    if df is None or df.empty:
        raise ValueError("DataFrame cannot be None or empty")
    
    if 'rating' not in df.columns:
        raise ValueError("DataFrame must contain 'rating' column")
    
    mean_rating = df['rating'].mean()
    std_rating = df['rating'].std()
    
    if std_rating == 0:
        df['rating'] = 0
    else:
        df['rating'] = (df['rating'] - mean_rating) / std_rating
    
    return df
