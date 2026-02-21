# Data cleaning utilities
import pandas as pd

def clean_data(df):
    """Clean data by removing NaN values and duplicates."""
    if df is None or df.empty:
        raise ValueError("DataFrame cannot be None or empty")
    
    df = df.dropna()
    df = df.drop_duplicates()
    return df
