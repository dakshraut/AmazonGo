# Configuration settings for ML Service
import os

# Get the parent directory path (ml-service root)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Data directories
DATA_DIR = os.path.join(BASE_DIR, "data")
RAW_DATA = os.path.join(DATA_DIR, "raw")
PROCESSED_DATA = os.path.join(DATA_DIR, "processed")

# Model save directory
MODEL_DIR = os.path.join(BASE_DIR, "saved_models")

# Individual model paths
APRIORI_MODEL = os.path.join(MODEL_DIR, "apriori.pkl")
COLLAB_MODEL = os.path.join(MODEL_DIR, "collaborative.pkl")
POPULARITY_MODEL = os.path.join(MODEL_DIR, "popularity.pkl")
HYBRID_MODEL = os.path.join(MODEL_DIR, "hybrid.pkl")

# Create necessary directories if they don't exist
for directory in [DATA_DIR, RAW_DATA, PROCESSED_DATA, MODEL_DIR]:
    os.makedirs(directory, exist_ok=True)
