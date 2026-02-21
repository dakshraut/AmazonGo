from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from app.models.hybrid import get_hybrid_recommendations

router = APIRouter()

# -----------------------------
# Request Model
# -----------------------------
class RecommendRequest(BaseModel):
    user_id: int
    purchased_items: List[str]   # ✅ changed to string


# -----------------------------
# Recommendation Endpoint
# -----------------------------
@router.post("/")
def recommend_products(request: RecommendRequest):
    recommendations = get_hybrid_recommendations(
        user_id=request.user_id,
        purchased_items=request.purchased_items
    )

    return {
        "user_id": request.user_id,
        "recommended_items": recommendations
    }
