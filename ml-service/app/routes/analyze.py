# Analysis route handlers
from fastapi import APIRouter
from app.pipelines.inference_pipeline import analyze

router = APIRouter()

@router.post("/")
def get_analysis(data: dict):
    if not data:
        return {"analysis": {}, "error": "Data cannot be empty"}
    analysis = analyze(data)
    return {"analysis": analysis}
