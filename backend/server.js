import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import ENV from "./config/env.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import socketHandler from "./sockets/socketHandler.js";
import * as mlService from "./services/mlService.js";
import logger from "./utils/logger.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: ENV.SOCKET_CORS
});

// =============================================
// Middleware Setup
// =============================================

// CORS configuration
app.use(cors({
  origin: ENV.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get("user-agent")
  });
  next();
});

// =============================================
// Database Connection
// =============================================
connectDB();

// =============================================
// Health Check Endpoints
// =============================================

// Backend health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "Backend API",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: ENV.NODE_ENV,
    version: "1.0.0"
  });
});

// ML Service health check
app.get("/health/ml", async (req, res) => {
  try {
    const mlHealth = await mlService.checkMLServiceHealth();
    res.status(mlHealth.healthy ? 200 : 503).json({
      status: mlHealth.healthy ? "healthy" : "unhealthy",
      service: "ML Service",
      details: mlHealth
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      service: "ML Service",
      error: error.message
    });
  }
});

// Combined health check for all services
app.get("/health/all", async (req, res) => {
  try {
    const mlHealth = await mlService.checkMLServiceHealth();
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        backend: {
          status: "healthy",
          uptime: process.uptime()
        },
        ml: {
          status: mlHealth.healthy ? "healthy" : "unhealthy",
          details: mlHealth
        }
      }
    });
  } catch (error) {
    res.status(503).json({
      status: "degraded",
      error: error.message
    });
  }
});

// =============================================
// API Routes
// =============================================

// Authentication routes (no protection)
app.use("/api/auth", authRoutes);

// Protected API routes
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/products", productRoutes);

// =============================================
// Socket.IO Handler
// =============================================
socketHandler(io);

// =============================================
// Error Handling
// =============================================
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    method: req.method
  });
});

// =============================================
// Server Startup
// =============================================

const PORT = ENV.PORT;

const startServer = async () => {
  try {
    // Check ML Service health on startup
    if (ENV.HEALTH_CHECK_ENABLED) {
      logger.info("Checking ML Service connectivity on startup...");
      const mlHealth = await mlService.checkMLServiceHealth();
      if (mlHealth.healthy) {
        logger.info("✓ ML Service is healthy");
      } else {
        logger.warn("⚠ ML Service is not available - running in degraded mode");
      }
    }

    server.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📡 Environment: ${ENV.NODE_ENV}`);
      logger.info(`🔗 ML Service URL: ${ENV.ML_SERVICE_URL}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { error: error.message });
    process.exit(1);
  }
};

startServer();

// =============================================
// Graceful Shutdown
// =============================================
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully...");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception", { error: error.message, stack: error.stack });
  process.exit(1);
});

export default app;
