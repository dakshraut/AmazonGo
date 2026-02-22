# AmazonGo - Backend & ML Service Integration

> A fully integrated e-commerce backend with machine learning-powered recommendations and analytics

![Status](https://img.shields.io/badge/status-active-success)
![Integration](https://img.shields.io/badge/backend--ml-integrated-blue)
![Docker](https://img.shields.io/badge/docker-supported-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🎯 Overview

AmazonGo is a complete backend solution with seamless integration between:
- **Backend API** (Node.js/Express) - RESTful API with authentication & data management
- **ML Service** (FastAPI/Python) - Machine learning for recommendations, analytics & insights
- **Database** (MongoDB) - Scalable document storage
- **Frontend Integration** (Real-time support via WebSockets)

### Key Features

✅ **Smart Recommendations** - Hybrid ML models (Collaborative, Content-Based, Popularity)
✅ **Real-time Analytics** - ML-powered insights and data analysis
✅ **User Management** - Complete authentication & authorization
✅ **Cart Operations** - Shopping cart with real-time updates
✅ **Transaction Tracking** - Complete purchase history
✅ **Health Monitoring** - Service health checks & status endpoints
✅ **Docker Ready** - One-command deployment with Docker Compose
✅ **Production Ready** - Comprehensive error handling & logging
✅ **Scalable** - Support for Kubernetes & cloud deployments

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16+
- **Python** v3.9+
- **MongoDB** v6.0+
- **Docker & Docker Compose** (optional)

### Installation (5 minutes)

```bash
# 1. Clone repository
git clone <repository-url>
cd AmazonGo

# 2. Setup environment
cp .env.example .env
# Edit .env with your configuration

# 3. Install dependencies
cd backend && npm install
cd ../ml-service && pip install -r requirements.txt

# 4. Run services
# Terminal 1: MongoDB
mongod

# Terminal 2: ML Service
cd ml-service
python -m uvicorn app.main:app --reload --port 8000

# Terminal 3: Backend
cd backend
npm run dev
```

### Docker Deployment (Recommended)

```bash
# One command to run everything
docker-compose -f docker/docker-compose.yml up -d

# Verify services
curl http://localhost:5000/health/all
```

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get up and running in minutes
- **[Integration Guide](./docs/INTEGRATION_GUIDE.md)** - Complete integration details
- **[Deployment Guide](./DEPLOYMENT.md)** - Production deployment strategies
- **[API Documentation](#api-endpoints)** - All endpoints and usage

## 🏗️ Architecture

```
┌─────────────────────────────────┐
│      Frontend (React/Vite)      │
└────────────┬────────────────────┘
             │ HTTP/WebSocket
             ▼
┌──────────────────────────────────┐
│   Backend API (Port 5000)        │
│   ├─ Authentication             │
│   ├─ Cart Management            │
│   ├─ Products                   │
│   ├─ Transactions               │
│   ├─ Analytics                  │
│   └─ Recommendations*           │
└────────────┬────────────────────┘
             │ HTTP REST
             ▼
┌──────────────────────────────────┐
│   ML Service (Port 8000)         │
│   ├─ Recommendations Engine      │
│   ├─ Analytics Pipeline         │
│   └─ Model Training             │
└────────────┬────────────────────┘
             │
             ▼
┌──────────────────────────────────┐
│   MongoDB Database (Port 27017)  │
└──────────────────────────────────┘

* ML-powered features
```

## 📡 API Endpoints

### Health & Status
```
GET  /health              - Backend health
GET  /health/ml          - ML service health
GET  /health/all         - All services status
```

### Authentication
```
POST /api/auth/register  - Register new user
POST /api/auth/login     - Login user
POST /api/auth/logout    - Logout user
```

### Products & Cart
```
GET  /api/products       - List all products
GET  /api/products/:id   - Get product details
POST /api/cart/add       - Add to cart
GET  /api/cart/:userId   - Get user cart
```

### Recommendations (ML Powered)
```
POST /api/recommendations                    - Get recommendations
GET  /api/recommendations/:userId            - Get personalized recommendations
GET  /api/recommendations/:userId/history    - Get recommendation history
```

### Analytics (ML Powered)
```
GET  /api/analytics                  - Get analytics data
GET  /api/analytics/ml/insights      - Get ML-based insights
GET  /api/analytics/summary          - Get analytics summary
POST /api/analytics                  - Create analytics record
```

### Transactions
```
GET  /api/transactions              - List transactions
GET  /api/transactions/:id          - Get transaction details
POST /api/transactions              - Create transaction
```

### Users
```
GET  /api/users                     - List all users (admin)
GET  /api/users/:id                 - Get user profile
PUT  /api/users/:id                 - Update user profile
DELETE /api/users/:id               - Delete user
```

## 🔌 Integration Features

### ML Service Integration (`mlService.js`)

The backend automatically integrates with the ML service for:

```javascript
// Get smart recommendations
const recommendations = await mlService.getRecommendations(
  purchasedItems,  // Array of product IDs
  userId          // User ID for personalization
);

// Get analytics insights
const analysis = await mlService.getAnalytics(data);

// Start model training
const result = await mlService.trainModels(trainingData);

// Check service health
const health = await mlService.checkMLServiceHealth();
```

### Features

- ✅ Automatic retry logic
- ✅ Timeout handling (30s default)
- ✅ Comprehensive error logging
- ✅ Graceful fallbacks
- ✅ Health monitoring

## 🐳 Docker Deployment

### Start All Services
```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Service URLs
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- ML Service: http://localhost:8000
- MongoDB: localhost:27017

### Useful Commands
```bash
# View logs
docker-compose -f docker/docker-compose.yml logs -f

# Stop services
docker-compose -f docker/docker-compose.yml down

# Remove volumes (clean slate)
docker-compose -f docker/docker-compose.yml down -v

# View service status
docker-compose -f docker/docker-compose.yml ps
```

## 📋 Project Structure

```
AmazonGo/
├── backend/                       # Backend API (Node.js)
│   ├── config/                    # Configuration
│   │   └── env.js                # Environment variables
│   ├── controllers/               # Route handlers
│   ├── middlewares/               # Custom middleware
│   ├── models/                    # Database schemas
│   ├── routes/                    # API routes
│   ├── services/                  # Business logic
│   │   ├── mlService.js          # ML integration
│   │   ├── analyticsService.js   # Analytics
│   │   └── notificationService.js
│   ├── utils/                     # Utilities
│   │   ├── logger.js             # Logging
│   │   ├── healthCheck.js        # Health monitoring
│   │   ├── hash.js               # Password hashing
│   │   └── token.js              # JWT tokens
│   ├── sockets/                   # WebSocket handlers
│   ├── server.js                  # Main server
│   └── package.json
│
├── ml-service/                    # ML Service (FastAPI)
│   ├── app/
│   │   ├── models/               # ML models
│   │   ├── routes/               # API endpoints
│   │   │   ├── recommend.py      # Recommendations
│   │   │   ├── analyze.py        # Analytics
│   │   │   └── train.py          # Model training
│   │   ├── pipelines/            # ML pipelines
│   │   ├── preprocessing/        # Data preprocessing
│   │   ├── config.py             # Configuration
│   │   └── main.py               # FastAPI app
│   ├── saved_models/             # Trained models
│   ├── data/                     # Training data
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/                      # Frontend (React/Vite)
│   ├── src/
│   │   ├── pages/                # Page components
│   │   ├── components/           # UI components
│   │   ├── context/              # State management
│   │   ├── hooks/                # Custom hooks
│   │   ├── services/             # API services
│   │   └── sockets/              # WebSocket client
│   └── package.json
│
├── docker/                        # Docker configuration
│   ├── docker-compose.yml        # Compose file
│   └── nginx.conf                # Nginx config
│
├── docs/                          # Documentation
│   └── INTEGRATION_GUIDE.md      # Integration details
│
├── scripts/                       # Utility scripts
├── tests/                         # Test suites
├── .env.example                   # Environment template
├── QUICK_START.md                # Quick start guide
├── DEPLOYMENT.md                 # Deployment guide
└── README.md                     # This file
```

## 🔧 Configuration

### Environment Variables

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

# Logging
LOG_LEVEL=info

# CORS
CORS_ORIGIN=*
```

See `.env.example` for complete configuration options.

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run ML service tests
cd ml-service && pytest

# Run integration tests
npm run test:integration
```

## 📊 Monitoring

### Health Checks

```bash
# Monitor all services
curl http://localhost:5000/health/all

# Check backend
curl http://localhost:5000/health

# Check ML service via backend
curl http://localhost:5000/health/ml
```

### Logging

```bash
# View backend logs
tail -f backend/logs/info.log
tail -f backend/logs/error.log

# View ML service logs
docker logs amazon-go-ml-service
```

## 🚀 Production Deployment

### Docker Compose (Small Scale)
```bash
docker-compose -f docker/docker-compose.yml -f docker/docker-compose.prod.yml up -d
```

### Kubernetes (Enterprise)
```bash
kubectl apply -f k8s/
```

See [Deployment Guide](./DEPLOYMENT.md) for detailed instructions.

## 🔐 Security

### Implemented Features

- ✅ JWT authentication
- ✅ Password hashing (bcryptjs)
- ✅ CORS protection
- ✅ Rate limiting
- ✅ Input validation
- ✅ Error handling without leaking details

### Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Configure CORS_ORIGIN for your domain
- [ ] Use HTTPS/SSL certificates
- [ ] Set NODE_ENV=production
- [ ] Enable database authentication
- [ ] Implement API keys for critical endpoints
- [ ] Regular security audits
- [ ] Monitor access logs

## 📈 Performance

### Optimization Tips

- Enable caching for recommendations
- Configure database indexes
- Use CDN for static assets
- Implement connection pooling
- Monitor ML model inference time
- Setup auto-scaling policies

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| ML Service not responding | Check if service is running: `curl http://localhost:8000/health` |
| Port already in use | Kill process: `lsof -i :5000` then `kill -9 <PID>` |
| MongoDB connection failed | Ensure MongoDB is running: `mongosh --eval "db.ping()"` |
| CORS errors | Configure CORS_ORIGIN in .env |
| Recommendations empty | Check ML service logs and ensure trained models exist |

See [Integration Guide](./docs/INTEGRATION_GUIDE.md) for more troubleshooting.

## 📞 Support

- 📖 [Integration Guide](./docs/INTEGRATION_GUIDE.md) - Complete integration details
- 🚀 [Quick Start](./QUICK_START.md) - Get started quickly
- 📦 [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- 🐛 Check logs: `backend/logs/` and Docker logs

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Docker Documentation](https://docs.docker.com)
- [Kubernetes Documentation](https://kubernetes.io/docs)

## 📝 Changelog

### v1.0.0 (Current)
- ✅ Full backend and ML service integration
- ✅ Health monitoring and checks
- ✅ Comprehensive logging
- ✅ Docker Compose deployment
- ✅ Complete API documentation
- ✅ Production-ready security

---

**Last Updated**: February 2026
**Status**: Production Ready ✅

For the latest updates and documentation, visit the project repository.
