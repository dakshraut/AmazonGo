from fastapi import APIRouter
from app.pipelines.training_pipeline import run_training

router = APIRouter()

@router.post("/")
def train():
    """Trigger the training pipeline."""
    result = run_training()
    return {"message": result, "status": "completed"}
