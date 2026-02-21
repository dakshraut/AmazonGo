import pickle
import random
import os

# -----------------------------
# Hybrid Recommendation Logic
# -----------------------------

PRODUCT_POOL = [101, 102, 103, 104, 105, 106, 107, 108, 109]


def get_hybrid_recommendations(user_id: int, purchased_items: list):
    """
    Simple runtime hybrid recommendation.
    (Replace with real scoring logic later)
    """
    available_products = list(set(PRODUCT_POOL) - set(purchased_items))

    if not available_products:
        return []

    return random.sample(available_products, min(3, len(available_products)))


# -----------------------------
# Combine Models During Training
# -----------------------------

def combine_models(apriori_model, collab_model, popularity_model, save_path):
    """
    Combine all trained models into a hybrid model
    and save it as a pickle file.
    """

    hybrid_model = {
        "apriori": apriori_model,
        "collaborative": collab_model,
        "popularity": popularity_model
    }

    try:
        with open(save_path, "wb") as f:
            pickle.dump(hybrid_model, f)

        return hybrid_model

    except Exception as e:
        print("Error saving hybrid model:", e)
        return None
