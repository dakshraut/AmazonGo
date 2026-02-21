# Evaluation metrics utilities
import numpy as np


def precision_at_k(actual, predicted, k=5):
    """
    Precision@K
    """
    predicted = predicted[:k]
    relevant = set(actual)
    recommended = set(predicted)

    return len(relevant & recommended) / k


def recall_at_k(actual, predicted, k=5):
    """
    Recall@K
    """
    predicted = predicted[:k]
    relevant = set(actual)
    recommended = set(predicted)

    if len(relevant) == 0:
        return 0

    return len(relevant & recommended) / len(relevant)


def f1_score(precision, recall):
    """
    F1 Score
    """
    if precision + recall == 0:
        return 0
    return 2 * (precision * recall) / (precision + recall)


def evaluate_model(actual, predicted, k=5):
    """
    Full evaluation pipeline
    """
    precision = precision_at_k(actual, predicted, k)
    recall = recall_at_k(actual, predicted, k)
    f1 = f1_score(precision, recall)

    return {
        "precision": precision,
        "recall": recall,
        "f1_score": f1
    }
