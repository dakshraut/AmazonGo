import axios from "axios";
import logger from "./logger.js";

/**
 * Service health check utility
 */
class HealthCheckManager {
  constructor() {
    this.services = {};
    this.checkInterval = null;
  }

  /**
   * Register a service for health checks
   */
  registerService(name, url, timeout = 5000) {
    this.services[name] = {
      name,
      url,
      timeout,
      lastStatus: "unknown",
      lastCheck: null,
      failureCount: 0
    };
  }

  /**
   * Check health of a single service
   */
  async checkServiceHealth(serviceName) {
    const service = this.services[serviceName];
    if (!service) {
      logger.warn(`Service not found for health check: ${serviceName}`);
      return { healthy: false, error: "Service not registered" };
    }

    try {
      const response = await axios.get(`${service.url}/health`, {
        timeout: service.timeout
      });

      service.lastStatus = "healthy";
      service.failureCount = 0;
      service.lastCheck = new Date();

      logger.debug(`Health check passed for ${serviceName}`, {
        status: response.data.status,
        timestamp: service.lastCheck
      });

      return {
        healthy: true,
        status: response.data.status,
        service: serviceName,
        lastCheck: service.lastCheck
      };
    } catch (error) {
      service.failureCount++;
      service.lastStatus = service.failureCount >= 3 ? "unhealthy" : "degraded";
      service.lastCheck = new Date();

      logger.warn(`Health check failed for ${serviceName}`, {
        error: error.message,
        failureCount: service.failureCount,
        url: service.url
      });

      return {
        healthy: false,
        status: service.lastStatus,
        service: serviceName,
        error: error.message,
        failureCount: service.failureCount,
        lastCheck: service.lastCheck
      };
    }
  }

  /**
   * Check health of all services
   */
  async checkAllServices() {
    const results = {};
    for (const serviceName of Object.keys(this.services)) {
      results[serviceName] = await this.checkServiceHealth(serviceName);
    }
    return results;
  }

  /**
   * Get service status summary
   */
  getStatusSummary() {
    const summary = {
      timestamp: new Date(),
      services: {},
      overallStatus: "healthy"
    };

    let allHealthy = true;
    for (const [name, service] of Object.entries(this.services)) {
      summary.services[name] = {
        status: service.lastStatus,
        lastCheck: service.lastCheck,
        failureCount: service.failureCount
      };

      if (service.lastStatus !== "healthy") {
        allHealthy = false;
      }
    }

    summary.overallStatus = allHealthy ? "healthy" : "degraded";
    return summary;
  }

  /**
   * Start periodic health checks
   */
  startPeriodicChecks(interval = 30000) {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(async () => {
      const results = await this.checkAllServices();
      logger.debug("Periodic health check completed", {
        results: Object.keys(results).map(key => ({
          service: key,
          healthy: results[key].healthy
        }))
      });
    }, interval);

    logger.info("Health check monitoring started", { interval });
  }

  /**
   * Stop periodic health checks
   */
  stopPeriodicChecks() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
      logger.info("Health check monitoring stopped");
    }
  }
}

export default new HealthCheckManager();
