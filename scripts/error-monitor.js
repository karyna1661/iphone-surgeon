#!/usr/bin/env node

/**
 * Comprehensive Error Monitoring Script for iPhone Surgeon
 * 
 * This script monitors the application for errors and provides:
 * - Real-time error detection
 * - Detailed error logging
 * - Performance monitoring
 * - Sanity CMS health checks
 * - Automatic error reporting
 * - Error pattern analysis
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const https = require('https');

// Configuration
const CONFIG = {
  PORT: process.env.PORT || 3001,
  HOST: process.env.HOST || 'localhost',
  LOG_DIR: path.join(__dirname, '..', 'logs'),
  ERROR_LOG: path.join(__dirname, '..', 'logs', 'errors.log'),
  PERFORMANCE_LOG: path.join(__dirname, '..', 'logs', 'performance.log'),
  SANITY_LOG: path.join(__dirname, '..', 'logs', 'sanity.log'),
  CHECK_INTERVAL: 30000, // 30 seconds
  SANITY_CHECK_INTERVAL: 60000, // 1 minute
  PERFORMANCE_CHECK_INTERVAL: 15000, // 15 seconds
  MAX_LOG_SIZE: 10 * 1024 * 1024, // 10MB
  ALERT_THRESHOLD: 5, // Alert after 5 errors in 5 minutes
  WEBHOOK_URL: process.env.ERROR_WEBHOOK_URL, // Optional webhook for alerts
};

// Error tracking
let errorCount = 0;
let errorWindow = [];
let performanceMetrics = [];
let sanityHealth = { status: 'unknown', lastCheck: null };

// Ensure logs directory exists
if (!fs.existsSync(CONFIG.LOG_DIR)) {
  fs.mkdirSync(CONFIG.LOG_DIR, { recursive: true });
}

// Logging utilities
class Logger {
  static log(level, message, data = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data,
      pid: process.pid,
    };
    
    const logLine = JSON.stringify(logEntry) + '\n';
    
    // Write to appropriate log file
    const logFile = this.getLogFile(level);
    fs.appendFileSync(logFile, logLine);
    
    // Console output for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${timestamp}] ${level.toUpperCase()}: ${message}`, data);
    }
    
    // Rotate log if too large
    this.rotateLogIfNeeded(logFile);
  }
  
  static getLogFile(level) {
    switch (level) {
      case 'error':
        return CONFIG.ERROR_LOG;
      case 'performance':
        return CONFIG.PERFORMANCE_LOG;
      case 'sanity':
        return CONFIG.SANITY_LOG;
      default:
        return CONFIG.ERROR_LOG;
    }
  }
  
  static rotateLogIfNeeded(logFile) {
    try {
      const stats = fs.statSync(logFile);
      if (stats.size > CONFIG.MAX_LOG_SIZE) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const rotatedFile = logFile.replace('.log', `-${timestamp}.log`);
        fs.renameSync(logFile, rotatedFile);
        Logger.log('info', `Log rotated: ${rotatedFile}`);
      }
    } catch (error) {
      console.error('Error rotating log:', error);
    }
  }
  
  static error(message, error, context = {}) {
    this.log('error', message, {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      context,
    });
  }
  
  static performance(metric, value, context = {}) {
    this.log('performance', metric, { value, context });
  }
  
  static sanity(message, data = {}) {
    this.log('sanity', message, data);
  }
}

// Error detection and analysis
class ErrorDetector {
  static async checkApplicationHealth() {
    try {
      const response = await this.makeRequest(`http://${CONFIG.HOST}:${CONFIG.PORT}/`);
      const isHealthy = response.statusCode === 200;
      
      if (!isHealthy) {
        Logger.error('Application health check failed', new Error(`HTTP ${response.statusCode}`), {
          statusCode: response.statusCode,
          url: `http://${CONFIG.HOST}:${CONFIG.PORT}/`,
        });
        this.trackError('health_check_failed', response.statusCode);
      }
      
      return isHealthy;
    } catch (error) {
      Logger.error('Application health check error', error, {
        url: `http://${CONFIG.HOST}:${CONFIG.PORT}/`,
      });
      this.trackError('health_check_error', error.message);
      return false;
    }
  }
  
  static async checkSanityHealth() {
    try {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      if (!projectId) {
        Logger.sanity('Sanity project ID not configured');
        sanityHealth = { status: 'not_configured', lastCheck: new Date() };
        return false;
      }
      
      const response = await this.makeRequest(
        `https://${projectId}.api.sanity.io/v2024-03-15/data/query/production?query=*[_type=="gallery"][0]`
      );
      
      const isHealthy = response.statusCode === 200;
      sanityHealth = {
        status: isHealthy ? 'healthy' : 'unhealthy',
        lastCheck: new Date(),
        statusCode: response.statusCode,
      };
      
      if (!isHealthy) {
        Logger.sanity('Sanity health check failed', {
          statusCode: response.statusCode,
          projectId,
        });
        this.trackError('sanity_health_failed', response.statusCode);
      }
      
      return isHealthy;
    } catch (error) {
      Logger.sanity('Sanity health check error', { error: error.message });
      sanityHealth = { status: 'error', lastCheck: new Date(), error: error.message };
      this.trackError('sanity_health_error', error.message);
      return false;
    }
  }
  
  static async checkPerformanceMetrics() {
    try {
      const startTime = Date.now();
      const response = await this.makeRequest(`http://${CONFIG.HOST}:${CONFIG.PORT}/`);
      const responseTime = Date.now() - startTime;
      
      const metric = {
        timestamp: new Date(),
        responseTime,
        statusCode: response.statusCode,
        contentLength: response.headers['content-length'] || 0,
      };
      
      performanceMetrics.push(metric);
      
      // Keep only last 100 metrics
      if (performanceMetrics.length > 100) {
        performanceMetrics = performanceMetrics.slice(-100);
      }
      
      Logger.performance('response_time', responseTime, {
        statusCode: response.statusCode,
        contentLength: metric.contentLength,
      });
      
      // Alert on slow responses
      if (responseTime > 5000) {
        Logger.error('Slow response detected', new Error(`Response time: ${responseTime}ms`), metric);
        this.trackError('slow_response', responseTime);
      }
      
      return metric;
    } catch (error) {
      Logger.error('Performance check error', error);
      this.trackError('performance_check_error', error.message);
      return null;
    }
  }
  
  static makeRequest(url) {
    return new Promise((resolve, reject) => {
      const client = url.startsWith('https') ? https : http;
      
      const req = client.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(res));
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
    });
  }
  
  static trackError(type, details) {
    const error = {
      timestamp: new Date(),
      type,
      details,
    };
    
    errorWindow.push(error);
    errorCount++;
    
    // Keep only errors from last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    errorWindow = errorWindow.filter(e => e.timestamp > fiveMinutesAgo);
    
    // Check if we should alert
    if (errorWindow.length >= CONFIG.ALERT_THRESHOLD) {
      this.sendAlert();
    }
    
    Logger.error(`Error tracked: ${type}`, new Error(details), { errorCount: errorWindow.length });
  }
  
  static async sendAlert() {
    if (!CONFIG.WEBHOOK_URL) return;
    
    const alert = {
      timestamp: new Date().toISOString(),
      message: `High error rate detected: ${errorWindow.length} errors in the last 5 minutes`,
      errors: errorWindow.slice(-10), // Last 10 errors
      performance: performanceMetrics.slice(-5), // Last 5 performance metrics
      sanity: sanityHealth,
    };
    
    try {
      const response = await fetch(CONFIG.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      });
      
      if (response.ok) {
        Logger.log('info', 'Alert sent successfully');
      } else {
        Logger.error('Failed to send alert', new Error(`HTTP ${response.status}`));
      }
    } catch (error) {
      Logger.error('Error sending alert', error);
    }
  }
}

// Performance analysis
class PerformanceAnalyzer {
  static analyzeMetrics() {
    if (performanceMetrics.length === 0) return null;
    
    const recent = performanceMetrics.slice(-20); // Last 20 metrics
    const responseTimes = recent.map(m => m.responseTime);
    
    const analysis = {
      averageResponseTime: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
      minResponseTime: Math.min(...responseTimes),
      maxResponseTime: Math.max(...responseTimes),
      slowRequests: recent.filter(m => m.responseTime > 2000).length,
      errorRate: recent.filter(m => m.statusCode >= 400).length / recent.length,
      totalRequests: recent.length,
    };
    
    Logger.performance('analysis', 'Performance analysis completed', analysis);
    
    return analysis;
  }
}

// Error pattern analysis
class ErrorAnalyzer {
  static analyzeErrors() {
    if (errorWindow.length === 0) return null;
    
    const errorTypes = {};
    const errorFrequency = {};
    
    errorWindow.forEach(error => {
      errorTypes[error.type] = (errorTypes[error.type] || 0) + 1;
      
      const hour = error.timestamp.getHours();
      errorFrequency[hour] = (errorFrequency[hour] || 0) + 1;
    });
    
    const analysis = {
      totalErrors: errorWindow.length,
      errorTypes,
      errorFrequency,
      mostCommonError: Object.keys(errorTypes).reduce((a, b) => 
        errorTypes[a] > errorTypes[b] ? a : b
      ),
      timeRange: {
        start: errorWindow[0]?.timestamp,
        end: errorWindow[errorWindow.length - 1]?.timestamp,
      },
    };
    
    Logger.log('info', 'Error analysis completed', analysis);
    
    return analysis;
  }
}

// Main monitoring loop
class ErrorMonitor {
  constructor() {
    this.isRunning = false;
    this.intervals = [];
  }
  
  start() {
    if (this.isRunning) {
      Logger.log('warn', 'Error monitor already running');
      return;
    }
    
    this.isRunning = true;
    Logger.log('info', 'Starting error monitoring', CONFIG);
    
    // Start monitoring intervals
    this.intervals.push(
      setInterval(() => this.checkApplication(), CONFIG.CHECK_INTERVAL),
      setInterval(() => this.checkSanity(), CONFIG.SANITY_CHECK_INTERVAL),
      setInterval(() => this.checkPerformance(), CONFIG.PERFORMANCE_CHECK_INTERVAL),
      setInterval(() => this.generateReport(), 300000), // 5 minutes
    );
    
    // Initial checks
    this.checkApplication();
    this.checkSanity();
    this.checkPerformance();
  }
  
  stop() {
    if (!this.isRunning) {
      Logger.log('warn', 'Error monitor not running');
      return;
    }
    
    this.isRunning = false;
    this.intervals.forEach(interval => clearInterval(interval));
    this.intervals = [];
    
    Logger.log('info', 'Error monitoring stopped');
  }
  
  async checkApplication() {
    try {
      await ErrorDetector.checkApplicationHealth();
    } catch (error) {
      Logger.error('Application check failed', error);
    }
  }
  
  async checkSanity() {
    try {
      await ErrorDetector.checkSanityHealth();
    } catch (error) {
      Logger.error('Sanity check failed', error);
    }
  }
  
  async checkPerformance() {
    try {
      await ErrorDetector.checkPerformanceMetrics();
    } catch (error) {
      Logger.error('Performance check failed', error);
    }
  }
  
  generateReport() {
    try {
      const performanceAnalysis = PerformanceAnalyzer.analyzeMetrics();
      const errorAnalysis = ErrorAnalyzer.analyzeErrors();
      
      const report = {
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        performance: performanceAnalysis,
        errors: errorAnalysis,
        sanity: sanityHealth,
        config: {
          port: CONFIG.PORT,
          host: CONFIG.HOST,
          checkInterval: CONFIG.CHECK_INTERVAL,
        },
      };
      
      Logger.log('info', 'Monitoring report generated', report);
      
      // Save report to file
      const reportFile = path.join(CONFIG.LOG_DIR, `report-${Date.now()}.json`);
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
      
    } catch (error) {
      Logger.error('Report generation failed', error);
    }
  }
}

// CLI interface
class CLI {
  static showHelp() {
    console.log(`
iPhone Surgeon Error Monitor

Usage:
  node scripts/error-monitor.js [command]

Commands:
  start     Start error monitoring (default)
  stop      Stop error monitoring
  status    Show current status
  logs      Show recent logs
  report    Generate current report
  help      Show this help

Environment Variables:
  PORT                    Application port (default: 3001)
  HOST                    Application host (default: localhost)
  ERROR_WEBHOOK_URL       Webhook URL for alerts
  NODE_ENV                Environment (development/production)

Examples:
  node scripts/error-monitor.js start
  ERROR_WEBHOOK_URL=https://hooks.slack.com/... node scripts/error-monitor.js start
    `);
  }
  
  static showStatus() {
    console.log(`
Error Monitor Status:
  Running: ${monitor.isRunning}
  Errors (5min): ${errorWindow.length}
  Performance Metrics: ${performanceMetrics.length}
  Sanity Status: ${sanityHealth.status}
  Last Sanity Check: ${sanityHealth.lastCheck}
  Uptime: ${Math.floor(process.uptime())}s
  Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
    `);
  }
  
  static showLogs() {
    try {
      const logFile = CONFIG.ERROR_LOG;
      if (fs.existsSync(logFile)) {
        const content = fs.readFileSync(logFile, 'utf8');
        const lines = content.split('\n').filter(line => line.trim());
        const recent = lines.slice(-20); // Last 20 lines
        
        console.log('\nRecent Error Logs:');
        recent.forEach(line => {
          try {
            const log = JSON.parse(line);
            console.log(`[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`);
            if (log.data.error) {
              console.log(`  Error: ${log.data.error.message}`);
            }
          } catch (e) {
            console.log(line);
          }
        });
      } else {
        console.log('No error logs found');
      }
    } catch (error) {
      console.error('Error reading logs:', error);
    }
  }
  
  static generateReport() {
    monitor.generateReport();
    console.log('Report generated in logs directory');
  }
}

// Initialize monitor
const monitor = new ErrorMonitor();

// Handle CLI commands
const command = process.argv[2] || 'start';

switch (command) {
  case 'start':
    monitor.start();
    break;
  case 'stop':
    monitor.stop();
    break;
  case 'status':
    CLI.showStatus();
    break;
  case 'logs':
    CLI.showLogs();
    break;
  case 'report':
    CLI.generateReport();
    break;
  case 'help':
    CLI.showHelp();
    break;
  default:
    console.log(`Unknown command: ${command}`);
    CLI.showHelp();
    process.exit(1);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down error monitor...');
  monitor.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\nShutting down error monitor...');
  monitor.stop();
  process.exit(0);
});

// Export for programmatic use
module.exports = { ErrorMonitor, Logger, ErrorDetector, PerformanceAnalyzer, ErrorAnalyzer };
