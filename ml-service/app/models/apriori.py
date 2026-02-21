# Apriori algorithm implementation
from mlxtend.frequent_patterns import apriori, association_rules
import pickle
import os

def train_apriori(basket, save_path):
    """Train apriori model for frequent itemsets."""
    try:
        if basket is None or basket.empty:
            raise ValueError("Basket data cannot be empty")
        
        frequent_items = apriori(basket, min_support=0.02, use_colnames=True)
        rules = association_rules(frequent_items, metric="lift", min_threshold=1)
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        
        with open(save_path, "wb") as f:
            pickle.dump(rules, f)
        
        return rules
    except Exception as e:
        raise RuntimeError(f"Failed to train apriori model: {str(e)}")
