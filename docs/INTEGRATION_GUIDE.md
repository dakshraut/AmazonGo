# AmazonGo Backend & ML Service Integration Guide

## Overview

This document describes the complete integration between the AmazonGo Backend API and ML Service. The integration enables the backend to leverage machine learning capabilities for recommendations, analytics, and intelligent data processing.

## Architecture

```
┌─────────────────┐
│    Frontend     │
│   (React/Vite)  │
└────────┬────────┘
         │ HTTP/WebSocket
         ▼
┌─────────────────────────────────────┐
│         Backend API                 │
│  (Node.js/Express - Port 5000)      │
├─────────────────────────────────────┤
│  ✓ User Management                  │
│  ✓ Authentication                   │
│  ✓ Cart Management                  │
│  ✓ Transactions                     │
│  ✓ Analytics                        │
│  ✓ Recommendations                  │
└────────┬────────────────────────────┘
         │ HTTP/RestAPI
         ▼
┌─────────────────────────────────────┐
│      ML Service                     │
│  (FastAPI/Python - Port 8000)       │
├─────────────────────────────────────┤
│  ✓ Product Recommendations          │
│  ✓ Analytics & Insights             │
│  ✓ Model Training                   │
│  ✓ Popularity Analysis              │
│  ✓ Collaborative Filtering          │
│  ✓ Hybrid Recommendations           │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│      MongoDB Database               │
│   (Port 27017)                      │
└─────────────────────────────────────┘
```

## Services Communication

### Backend → ML Service Communication

The backend communicates with the ML service through the **`mlService.js`** module, which provides:

#### 1. **Recommendations Service**
```javascript
// Request product recommendations
const recommendations = await getRecommendations(
  purchasedItems,  // Array of product IDs
  userId          // User ID for personalization
);
```

**Endpoint**: `POST /api/recommend`
**Payload**:
```json
{
  "user_id": "user123",
  "purchased_items": ["product1", "product2"]
}
```

#### 2. **Analytics Service**
```javascript
// Get ML-based analytics
const analysis = await getAnalytics(data);
```

**Endpoint**: `POST /api/analyze`
**Payload**: Custom analytics data object

#### 3. **Model Training**
```javascript
// Train or retrain ML models
const result = await trainModels(trainingData);
```

**Endpoint**: `POST /api/train`

#### 4. **Health Check**
```javascript
// Check ML service health
const health = await checkMLServiceHealth();
```

**Endpoint**: `GET /health`

## API Endpoints

### Backend Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

#### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user

#### Cart & Products
- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/:userId` - Get user's cart
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details

#### Recommendations (ML Integrated)
- `POST /api/recommendations` - Get product recommendations
  - **Protected**: Requires authentication
  - **Body**: `{ cartItems: [], userId: "string" }`
  - **Response**: Array of recommended products

- `GET /api/recommendations/:userId` - Get personalized recommendations
- `GET /api/recommendations/:userId/history` - Get recommendation history

#### Analytics (ML Integrated)
- `GET /api/analytics` - Get analytics data
  - **Query**: `?startDate=&endDate=&userId=`
  - **Response**: Array of analytics records

- `GET /api/analytics/ml/insights` - Get ML-based insights
  - **Query**: `?period=30d`
  - **Response**: Aggregated analytics with ML analysis

- `GET /api/analytics/summary` - Get analytics summary
- `POST /api/analytics` - Create analytics record

#### Transactions
- `GET /api/transactions` - Get all transactions
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/transactions` - Create new transaction

#### Health Checks
- `GET /health` - Backend health
- `GET /health/ml` - ML service health
- `GET /health/all` - All services health

## Environment Configuration

### Required Environment Variables

Create a `.env` file in the project root (use `.env.example` as template):

```bash
# Backend
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/amazon-go

# ML Service
ML_SERVICE_URL=http://localhost:8000
ML_SERVICE_TIMEOUT=30000

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d

# Database (for Docker)
MONGO_USERNAME=root
MONGO_PASSWORD=password

# Logging
LOG_LEVEL=info

# CORS
CORS_ORIGIN=*
```

## Deployment

### Local Development

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   cd ../ml-service
   pip install -r requirements.txt
   ```

2. **Start Services**
   ```bash
   # Terminal 1: Backend
   cd backend
   npm run dev
   
   # Terminal 2: ML Service
   cd ml-service
   python -m uvicorn app.main:app --reload --port 8000
   
   # Terminal 3: MongoDB
   mongod
   ```

### Docker Deployment

1. **Build and Run with Docker Compose**
   ```bash
   docker-compose -f docker/docker-compose.yml up -d
   ```

2. **Check Service Status**
   ```bash
   # Check all services health
   curl http://localhost:5000/health/all
   
   # Check backend only
   curl http://localhost:5000/health
   
   # Check ML service only
   curl http://localhost:5000/health/ml
   ```

3. **View Logs**
   ```bash
   docker-compose -f docker/docker-compose.yml logs -f backend
   docker-compose -f docker/docker-compose.yml logs -f ml-service
   ```

4. **Stop Services**
   ```bash
   docker-compose -f docker/docker-compose.yml down
   ```

## Service Integration Details

### ML Service Integration Module (`mlService.js`)

The module provides:

#### Features:
- ✅ Automatic retry logic
- ✅ Timeout handling (30 seconds default)
- ✅ Comprehensive error logging
- ✅ Health checks
- ✅ Graceful fallbacks

#### Error Handling:
```javascript
try {
  const recommendations = await getRecommendations(items, userId);
} catch (error) {
  // Error is logged and empty array is returned
  // Application continues without recommendations
}
```

#### Logging:
All ML service interactions are logged with:
- Timestamp
- Request/Response details
- Performance metrics
- Error information

### Health Monitoring

#### Periodic Health Checks
The backend includes automatic health monitoring for the ML service:

```javascript
// Started in server.js
healthCheckManager.registerService(
  'ml-service',
  ENV.ML_SERVICE_URL,
  5000
);
healthCheckManager.startPeriodicChecks(30000); // Every 30 seconds
```

#### Status Endpoints
- Backend health: `GET /health`
- ML service health: `GET /health/ml`
- All services: `GET /health/all`

## Troubleshooting

### ML Service Not Responding

1. **Check Service is Running**
   ```bash
   curl http://localhost:8000/health
   ```

2. **Check Network Connectivity**
   ```bash
   docker network ls
   docker inspect amazon-go-network
   ```

3. **Check Logs**
   ```bash
   docker logs amazon-go-ml-service
   ```

### Database Connection Issues

1. **Verify MongoDB is Running**
   ```bash
   mongosh --eval "db.adminCommand('ping')"
   ```

2. **Check Connection String**
   ```
   mongodb://username:password@host:port/database?authSource=admin
   ```

### Recommendation Requests Failing

1. **Verify Backend can reach ML Service**
   ```bash
   curl -X GET http://localhost:5000/health/ml
   ```

2. **Check Request Format**
   - Ensure `cartItems` is an array
   - Ensure `userId` is provided (can be null)

3. **Review Logs**
   ```bash
   tail -f backend/logs/error.log
   ```

## Performance Optimization

### Caching
- Recommendations are cached per user session
- Analytics results are aggregated and cached

### Timeouts
- ML inference: 30 seconds (configurable)
- Database queries: 10 seconds
- API requests: 30 seconds

### Rate Limiting
- API: 100 requests per 15 minutes per IP
- ML inference: 10 concurrent requests

## Future Enhancements

- [ ] Implement recommendation caching
- [ ] Add model versioning
- [ ] Implement A/B testing framework
- [ ] Add real-time model monitoring
- [ ] Implement model auto-retraining
- [ ] Add prediction explainability
- [ ] Implement cost optimization

## Support & Documentation

- **Backend API Docs**: Available at `http://localhost:5000/api/docs` (Swagger)
- **ML Service Docs**: Available at `http://localhost:8000/docs` (FastAPI)
- **Error Logs**: Check `backend/logs/` directory
- **Database**: MongoDB available at `mongodb://localhost:27017`

## Contact & Issues

For integration issues or feature requests, please refer to the project documentation or contact the development team.
