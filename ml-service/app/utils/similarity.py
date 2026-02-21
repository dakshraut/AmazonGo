# Similarity calculation utilities
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def compute_cosine_similarity(matrix):
    """
    Compute cosine similarity matrix
    """
    similarity = cosine_similarity(matrix)
    return similarity


def get_similar_users(user_index, similarity_matrix, top_k=5):
    """
    Get top similar users for collaborative filtering
    """
    similarity_scores = similarity_matrix[user_index]
    
    # Sort by similarity score (descending)
    similar_users = np.argsort(similarity_scores)[::-1]

    # Remove self index
    similar_users = similar_users[similar_users != user_index]

    return similar_users[:top_k]


def score_items_from_similar_users(user_index, matrix, similarity_matrix, top_k=5):
    """
    Score items using similar users
    """
    similar_users = get_similar_users(user_index, similarity_matrix, top_k)

    weighted_scores = np.zeros(matrix.shape[1])

    for sim_user in similar_users:
        weighted_scores += matrix[sim_user]

    return weighted_scores


def normalize_scores(scores):
    """
    Normalize scores between 0 and 1
    """
    if np.max(scores) == 0:
        return scores
    return scores / np.max(scores)
