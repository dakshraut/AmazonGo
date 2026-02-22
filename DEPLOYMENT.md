# Deployment Guide - AmazonGo Backend & ML Service Integration

## Deployment Strategies

### Strategy 1: Docker Compose (Recommended for Development & Small Production)

#### Single Command Deployment
```bash
# Navigate to project root
cd /path/to/AmazonGo

# Copy and configure environment
cp .env.example .env
# Edit .env with your settings

# Build and start all services
docker-compose -f docker/docker-compose.yml up -d

# Verify all services are healthy
curl http://localhost:5000/health/all
```

#### Service Management
```bash
# View all services
docker-compose -f docker/docker-compose.yml ps

# View logs
docker-compose -f docker/docker-compose.yml logs -f
docker-compose -f docker/docker-compose.yml logs -f backend
docker-compose -f docker/docker-compose.yml logs -f ml-service

# Stop services
docker-compose -f docker/docker-compose.yml down

# Stop and remove volumes (clean slate)
docker-compose -f docker/docker-compose.yml down -v

# Restart services
docker-compose -f docker/docker-compose.yml restart

# Scale services
docker-compose -f docker/docker-compose.yml up -d --scale backend=2
```

### Strategy 2: Kubernetes Deployment (Enterprise Production)

#### Prerequisites
- Kubernetes cluster (GKE, EKS, AKS, or local Minikube)
- kubectl configured
- Docker images pushed to container registry

#### Deployment Files
Create `k8s/` directory with the following manifests:

##### 1. Namespace
```yaml
# k8s/namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: amazon-go
```

##### 2. ConfigMap for Environment
```yaml
# k8s/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: amazon-go-config
  namespace: amazon-go
data:
  NODE_ENV: "production"
  LOG_LEVEL: "info"
  ML_SERVICE_URL: "http://ml-service:8000"
```

##### 3. Secrets
```yaml
# k8s/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: amazon-go-secrets
  namespace: amazon-go
type: Opaque
data:
  JWT_SECRET: <base64-encoded-secret>
  MONGODB_PASSWORD: <base64-encoded-password>
```

##### 4. MongoDB Deployment
```yaml
# k8s/mongodb.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mongodb
  namespace: amazon-go
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:6.0
        ports:
        - containerPort: 27017
        env:
        - name: MONGO_INITDB_ROOT_USERNAME
          value: "root"
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: amazon-go-secrets
              key: MONGODB_PASSWORD
        volumeMounts:
        - name: mongodb-storage
          mountPath: /data/db
      volumes:
      - name: mongodb-storage
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb
  namespace: amazon-go
spec:
  ports:
  - port: 27017
    targetPort: 27017
  selector:
    app: mongodb
```

##### 5. Backend Deployment
```yaml
# k8s/backend.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
  namespace: amazon-go
spec:
  replicas: 2
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: backend
        image: your-registry/amazon-go-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: MONGODB_URI
          value: "mongodb://root:password@mongodb:27017/amazon-go?authSource=admin"
        - name: ML_SERVICE_URL
          valueFrom:
            configMapKeyRef:
              name: amazon-go-config
              key: ML_SERVICE_URL
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: amazon-go-secrets
              key: JWT_SECRET
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 10
          periodSeconds: 5
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: backend
  namespace: amazon-go
spec:
  type: LoadBalancer
  ports:
  - port: 5000
    targetPort: 5000
  selector:
    app: backend
```

##### 6. ML Service Deployment
```yaml
# k8s/ml-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ml-service
  namespace: amazon-go
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ml-service
  template:
    metadata:
      labels:
        app: ml-service
    spec:
      containers:
      - name: ml-service
        image: your-registry/amazon-go-ml-service:latest
        ports:
        - containerPort: 8000
        env:
        - name: PYTHONUNBUFFERED
          value: "1"
        livenessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8000
          initialDelaySeconds: 10
          periodSeconds: 5
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "1000m"
        volumeMounts:
        - name: models
          mountPath: /app/saved_models
      volumes:
      - name: models
        emptyDir: {}
---
apiVersion: v1
kind: Service
metadata:
  name: ml-service
  namespace: amazon-go
spec:
  type: ClusterIP
  ports:
  - port: 8000
    targetPort: 8000
  selector:
    app: ml-service
```

#### Deploy to Kubernetes
```bash
# Create namespace
kubectl apply -f k8s/namespace.yaml

# Create secrets and config
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secrets.yaml

# Deploy services
kubectl apply -f k8s/mongodb.yaml
kubectl apply -f k8s/ml-service.yaml
kubectl apply -f k8s/backend.yaml

# Check deployment status
kubectl get pods -n amazon-go
kubectl get svc -n amazon-go

# View logs
kubectl logs -n amazon-go -l app=backend
kubectl logs -n amazon-go -l app=ml-service
```

### Strategy 3: Virtual Machine / Cloud VPS (AWS EC2, DigitalOcean, etc.)

#### 1. Prerequisites on VM
```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python
sudo apt-get install -y python3 python3-pip python3-venv

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod

# Install Docker (optional, for containerized deployment)
sudo apt-get install -y docker.io docker-compose
sudo usermod -aG docker $USER
```

#### 2. Clone and Setup
```bash
# Clone repository
git clone <repository-url> /home/ubuntu/amazon-go
cd /home/ubuntu/amazon-go

# Setup backend
cd backend
npm install
npm start &

# Setup ML service
cd ../ml-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 &
```

#### 3. Process Management with PM2
```bash
# Install PM2 globally
sudo npm install -g pm2

# Create ecosystem.config.js
cat > /home/ubuntu/amazon-go/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'backend',
      cwd: '/home/ubuntu/amazon-go/backend',
      script: 'server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      instances: 2,
      exec_mode: 'cluster',
      max_memory_restart: '500M'
    },
    {
      name: 'ml-service',
      cwd: '/home/ubuntu/amazon-go/ml-service',
      script: 'python',
      args: '-m uvicorn app.main:app --host 0.0.0.0 --port 8000',
      env: {
        PYTHONUNBUFFERED: 1
      },
      instances: 1
    }
  ]
};
EOF

# Start services
pm2 start ecosystem.config.js
pm2 startup
pm2 save
pm2 logs

# Monitor
pm2 monit
```

## Production Checklist

### Security
- [ ] Set strong JWT_SECRET in environment
- [ ] Configure CORS_ORIGIN to specific domains
- [ ] Use HTTPS/SSL certificates
- [ ] Set NODE_ENV=production
- [ ] Implement API authentication/authorization
- [ ] Enable database authentication
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting

### Performance
- [ ] Enable caching for recommendations
- [ ] Configure database indexes
- [ ] Setup CDN for static assets
- [ ] Implement connection pooling
- [ ] Configure resource limits in containers
- [ ] Setup auto-scaling policies

### Monitoring & Logging
- [ ] Configure log aggregation (ELK, CloudWatch)
- [ ] Setup error tracking (Sentry, Rollbar)
- [ ] Monitor service health
- [ ] Setup alerts for failures
- [ ] Implement distributed tracing
- [ ] Monitor ML model performance

### Backup & Recovery
- [ ] Backup MongoDB regularly
- [ ] Test restore procedures
- [ ] Store backups off-site
- [ ] Document recovery procedures
- [ ] Version control all code
- [ ] Version control configuration

### Database
- [ ] Create database backups
- [ ] Setup replication
- [ ] Configure backup retention
- [ ] Test disaster recovery
- [ ] Optimize indexes
- [ ] Monitor disk space

## Monitoring & Health Checks

### Service Health Endpoints
```bash
# Check backend health
curl http://your-domain:5000/health

# Check ML service health
curl http://your-domain:5000/health/ml

# Check all services
curl http://your-domain:5000/health/all
```

### Logging
```bash
# Backend logs
tail -f backend/logs/error.log
tail -f backend/logs/info.log

# ML service logs
docker logs amazon-go-ml-service
```

### Database Health
```bash
# Connect to MongoDB
mongosh --username root --password

# Check replication status
rs.status()

# Check database size
db.stats()
```

## Scaling Strategies

### Horizontal Scaling
```bash
# Docker Compose - scale backend instances
docker-compose -f docker/docker-compose.yml up -d --scale backend=3

# Kubernetes - scale replicas
kubectl scale deployment backend -n amazon-go --replicas=5
```

### Vertical Scaling
- Increase resource limits in container configuration
- Upgrade host machine specs
- Configure database sharding

## Rollback Procedures

### Docker Compose
```bash
# Use specific image version
docker-compose -f docker/docker-compose.yml pull

# Restart with new version
docker-compose -f docker/docker-compose.yml restart backend
```

### Kubernetes
```bash
# View rollout history
kubectl rollout history deployment/backend -n amazon-go

# Rollback to previous version
kubectl rollout undo deployment/backend -n amazon-go
```

## Troubleshooting Deployment

### Services won't start
1. Check logs: `docker-compose logs -f`
2. Verify environment variables: `cat .env`
3. Check port availability: `netstat -tlnp | grep :5000`

### High memory usage
1. Check resource limits in configuration
2. Monitor queries with `mongosh`
3. Review ML model memory usage

### Slow recommendations
1. Check ML service latency
2. Monitor database query performance
3. Review network connectivity

## Support Resources

- Docker Documentation: https://docs.docker.com
- Kubernetes Documentation: https://kubernetes.io/docs
- MongoDB Documentation: https://docs.mongodb.com
- FastAPI Documentation: https://fastapi.tiangolo.com
- Express.js Documentation: https://expressjs.com

---

For specific deployment questions, refer to the [Integration Guide](./docs/INTEGRATION_GUIDE.md) or [Quick Start](./QUICK_START.md).
