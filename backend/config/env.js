import dotenv from "dotenv";

dotenv.config();

const ENV = {
  // Server Configuration
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  
  // Database Configuration
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/amazon-go",
  
  // ML Service Configuration
  ML_SERVICE_URL: process.env.ML_SERVICE_URL || "http://localhost:8000",
  ML_SERVICE_TIMEOUT: process.env.ML_SERVICE_TIMEOUT || 30000,
  
  // JWT Configuration
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key",
  JWT_EXPIRE: process.env.JWT_EXPIRE || "7d",
  
  // Logging Configuration
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  LOG_FORMAT: process.env.LOG_FORMAT || "combined",
  
  // CORS Configuration
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  
  // Rate Limiting
  RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS || 100,
  
  // Socket.IO Configuration
  SOCKET_CORS: JSON.parse(process.env.SOCKET_CORS || '{"origin":"*"}'),
  
  // Service Health Check
  HEALTH_CHECK_ENABLED: process.env.HEALTH_CHECK_ENABLED !== "false",
  HEALTH_CHECK_INTERVAL: process.env.HEALTH_CHECK_INTERVAL || 30000, // 30 seconds
};

/**
 * Validate required environment variables
 */
const validateEnv = () => {
  const required = ["MONGODB_URI", "JWT_SECRET"];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn(`⚠️ Missing environment variables: ${missing.join(", ")}`);
  }
};

validateEnv();

export default ENV;
