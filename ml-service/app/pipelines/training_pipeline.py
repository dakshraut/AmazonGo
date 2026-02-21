# Training pipeline orchestration
import pandas as pd
import os
from app.preprocessing.cleaner import clean_data
from app.preprocessing.feature_engineering import create_transaction_matrix
from app.models.apriori import train_apriori
from app.models.collaborative import train_collaborative
from app.models.popularity import train_popularity
from app.models.hybrid import combine_models
from app.config import *

def run_training():
    """Run the complete training pipeline."""
    try:
        csv_path = f"{RAW_DATA}/transactions.csv"
        if not os.path.exists(csv_path):
            return f"Error: Data file not found at {csv_path}"
        
        df = pd.read_csv(csv_path)
        
        df = clean_data(df)
        
        basket = create_transaction_matrix(df)
        
        # Create model directory if it doesn't exist
        os.makedirs(MODEL_DIR, exist_ok=True)
        
        apriori_rules = train_apriori(basket, APRIORI_MODEL)
        collab_model = train_collaborative(basket, COLLAB_MODEL)
        popularity_model = train_popularity(df, POPULARITY_MODEL)
        
        hybrid_model = combine_models(
            apriori_rules,
            collab_model,
            popularity_model,
            HYBRID_MODEL
        )
        
        return "Training Completed Successfully"
    except Exception as e:
        return f"Training Failed: {str(e)}"
