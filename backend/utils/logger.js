import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logDir = path.join(__dirname, "../logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
  TRACE: 4
};

const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const currentLogLevel = LOG_LEVELS[LOG_LEVEL.toUpperCase()] || LOG_LEVELS.INFO;

/**
 * Format log message with timestamp and metadata
 */
const formatLog = (level, message, metadata = {}) => {
  const timestamp = new Date().toISOString();
  const metadataStr = Object.keys(metadata).length > 0 
    ? JSON.stringify(metadata) 
    : "";
  return `[${timestamp}] [${level.toUpperCase()}] ${message} ${metadataStr}`.trim();
};

/**
 * Write log to file
 */
const writeToFile = (logFile, message) => {
  const filePath = path.join(logDir, logFile);
  try {
    fs.appendFileSync(filePath, message + "\n");
  } catch (error) {
    console.error("Failed to write log file:", error.message);
  }
};

/**
 * Logger object with different log levels
 */
const logger = {
  error: (message, metadata = {}) => {
    if (currentLogLevel >= LOG_LEVELS.ERROR) {
      const log = formatLog("error", message, metadata);
      console.error(log);
      writeToFile("error.log", log);
    }
  },

  warn: (message, metadata = {}) => {
    if (currentLogLevel >= LOG_LEVELS.WARN) {
      const log = formatLog("warn", message, metadata);
      console.warn(log);
      writeToFile("warn.log", log);
    }
  },

  info: (message, metadata = {}) => {
    if (currentLogLevel >= LOG_LEVELS.INFO) {
      const log = formatLog("info", message, metadata);
      console.log(log);
      writeToFile("info.log", log);
    }
  },

  debug: (message, metadata = {}) => {
    if (currentLogLevel >= LOG_LEVELS.DEBUG) {
      const log = formatLog("debug", message, metadata);
      console.log(log);
      writeToFile("debug.log", log);
    }
  },

  trace: (message, metadata = {}) => {
    if (currentLogLevel >= LOG_LEVELS.TRACE) {
      const log = formatLog("trace", message, metadata);
      console.log(log);
    }
  }
};

export default logger;

