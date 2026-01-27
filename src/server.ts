/**
 * DCYFR AI-powered Web Server
 * 
 * Express-based web server demonstrating DCYFR AI framework integration
 * for modern web development.
 */

import express, { Request, Response, NextFunction } from 'express';
import { ValidationFramework, TelemetryEngine } from '@dcyfr/ai';
import { createLogger } from './lib/logger.js';
import { loadConfig } from './lib/config.js';

const logger = createLogger('server');

export interface ServerContext {
  validation: ValidationFramework;
  telemetry: TelemetryEngine;
  config: Awaited<ReturnType<typeof loadConfig>>;
}

/**
 * Create and configure Express server with DCYFR AI framework
 */
export async function createServer(): Promise<{ app: express.Application; context: ServerContext }> {
  const config = await loadConfig();
  
  // Initialize DCYFR AI framework
  const telemetry = new TelemetryEngine({
    enabled: config.telemetry.enabled,
    storage: 'file',
    basePath: '.dcyfr/telemetry'
  });
  
  const validation = new ValidationFramework({
    failureMode: config.validation.enabled ? 'error' : 'warn',
    parallel: true
  });
  
  const context: ServerContext = { validation, telemetry, config };
  
  const app = express();
  
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Request logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.info('HTTP Request', {
        method: req.method,
        path: req.path,
        status: res.statusCode,
        duration: `${duration}ms`
      });
    });
    
    next();
  });
  
  // Health check endpoint
  app.get('/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      framework: {
        validation: config.validation.enabled,
        telemetry: config.telemetry.enabled
      }
    });
  });
  
  // API routes
  app.get('/api/status', (_req: Request, res: Response) => {
    res.json({
      service: 'dcyfr-ai-nodejs',
      version: '1.0.0',
      framework: '@dcyfr/ai',
      uptime: process.uptime(),
      memory: process.memoryUsage()
    });
  });
  
  // Example: Validation endpoint
  app.post('/api/validate', async (req: Request, res: Response): Promise<void> => {
    try {
      const { data } = req.body;
      
      if (!data) {
        res.status(400).json({
          error: 'Missing data field in request body'
        });
        return;
      }
      
      logger.info('Validation request received', { data });
      
      // Example validation logic
      const isValid = typeof data === 'object' && data !== null;
      
      res.json({
        valid: isValid,
        data,
        timestamp: new Date().toISOString()
      });
      return;
    } catch (error) {
      logger.error('Validation error', { error });
      res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });
  
  // Example: Telemetry endpoint
  app.get('/api/telemetry/stats', (_req: Request, res: Response) => {
    res.json({
      enabled: config.telemetry.enabled,
      storage: 'file',
      message: 'Telemetry collection active'
    });
  });
  
  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.path
    });
  });
  
  // Error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error('Server error', {
      error: {
        message: err.message,
        stack: err.stack,
        name: err.name
      }
    });
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message
    });
  });
  
  logger.info('Server configured with DCYFR AI framework');
  
  return { app, context };
}

/**
 * Start the server
 */
export async function startServer(port: number = 3000): Promise<void> {
  const { app, context } = await createServer();
  
  const server = app.listen(port, () => {
    logger.info('Server started', {
      port,
      environment: process.env.NODE_ENV || 'development',
      urls: {
        local: `http://localhost:${port}`,
        health: `http://localhost:${port}/health`,
        api: `http://localhost:${port}/api/status`
      }
    });
  });
  
  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down server...');
    
    server.close(() => {
      logger.info('Server closed');
    });
    
    await context.telemetry.shutdown?.();
    process.exit(0);
  };
  
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

// Run server if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  startServer();
}
