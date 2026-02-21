# ML Service Main Application

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import train, recommend, analyze

# Create FastAPI app
app = FastAPI(
    title="AmazonGo ML Service",
    version="1.0.0",
    description="Machine Learning Microservice for Recommendation System"
)

# -----------------------------
# CORS Configuration
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Root Endpoint
# -----------------------------
@app.get("/")
def root():
    return {
        "message": "AmazonGo ML Service is running 🚀",
        "docs": "/docs",
        "health": "/health"
    }

# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ML Service",
        "version": "1.0.0"
    }

# -----------------------------
# Include Routers
# -----------------------------
app.include_router(
    train.router,
    prefix="/api/train",
    tags=["Training"]
)

app.include_router(
    recommend.router,
    prefix="/api/recommend",
    tags=["Recommendations"]
)

app.include_router(
    analyze.router,
    prefix="/api/analyze",
    tags=["Analytics"]
)
