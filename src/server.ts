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
  
  // Index page
  app.get('/', (_req: Request, res: Response) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DCYFR AI Node.js Starter</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #333;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            max-width: 800px;
            width: 100%;
            padding: 40px;
        }
        h1 {
            color: #667eea;
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .subtitle {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 30px;
        }
        .status {
            display: inline-block;
            background: #10b981;
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 0.9em;
            margin-bottom: 20px;
        }
        .section {
            margin: 30px 0;
        }
        h2 {
            color: #333;
            font-size: 1.5em;
            margin-bottom: 15px;
            border-bottom: 2px solid #667eea;
            padding-bottom: 8px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 15px;
            margin: 10px 0;
            border-radius: 8px;
            border-left: 4px solid #667eea;
        }
        .endpoint-method {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85em;
            font-weight: bold;
            margin-right: 10px;
        }
        .endpoint-path {
            font-family: 'Courier New', monospace;
            color: #333;
            font-weight: bold;
        }
        .endpoint-desc {
            color: #666;
            margin-top: 8px;
            font-size: 0.95em;
        }
        .endpoint-link {
            display: inline-block;
            margin-top: 8px;
            color: #667eea;
            text-decoration: none;
            font-size: 0.9em;
        }
        .endpoint-link:hover {
            text-decoration: underline;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .feature {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        .feature-icon {
            font-size: 2em;
            margin-bottom: 8px;
        }
        .feature-title {
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .feature-desc {
            color: #666;
            font-size: 0.9em;
        }
        footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #666;
            font-size: 0.9em;
        }
        .badge {
            display: inline-block;
            background: #f3f4f6;
            color: #666;
            padding: 4px 10px;
            border-radius: 4px;
            font-size: 0.85em;
            margin: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 DCYFR AI Node.js</h1>
        <p class="subtitle">Production-ready starter template with Express & TypeScript</p>
        <span class="status">✓ Server Running</span>
        
        <div class="section">
            <h2>API Endpoints</h2>
            
            <div class="endpoint">
                <span class="endpoint-method">GET</span>
                <span class="endpoint-path">/health</span>
                <p class="endpoint-desc">Health check and framework status</p>
                <a href="/health" class="endpoint-link" target="_blank">→ Try it</a>
            </div>
            
            <div class="endpoint">
                <span class="endpoint-method">GET</span>
                <span class="endpoint-path">/api/status</span>
                <p class="endpoint-desc">Service metrics and uptime information</p>
                <a href="/api/status" class="endpoint-link" target="_blank">→ Try it</a>
            </div>
            
            <div class="endpoint">
                <span class="endpoint-method">POST</span>
                <span class="endpoint-path">/api/validate</span>
                <p class="endpoint-desc">Data validation endpoint with DCYFR AI</p>
                <code style="display: block; margin-top: 8px; font-size: 0.85em; color: #666;">
                    curl -X POST http://localhost:3000/api/validate -H "Content-Type: application/json" -d '{"data": {"email": "user@example.com"}}'
                </code>
            </div>
            
            <div class="endpoint">
                <span class="endpoint-method">GET</span>
                <span class="endpoint-path">/api/telemetry/stats</span>
                <p class="endpoint-desc">Telemetry configuration and statistics</p>
                <a href="/api/telemetry/stats" class="endpoint-link" target="_blank">→ Try it</a>
            </div>
        </div>
        
        <div class="section">
            <h2>Framework Features</h2>
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">🤖</div>
                    <div class="feature-title">DCYFR AI</div>
                    <div class="feature-desc">Integrated validation & telemetry</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">Express</div>
                    <div class="feature-desc">Fast, minimalist web framework</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">📘</div>
                    <div class="feature-title">TypeScript</div>
                    <div class="feature-desc">Strict mode type safety</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🧪</div>
                    <div class="feature-title">Vitest</div>
                    <div class="feature-desc">Modern testing framework</div>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Quick Start</h2>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; font-family: 'Courier New', monospace; font-size: 0.9em;">
                <div># Install dependencies</div>
                <div style="color: #667eea;">npm install</div>
                <div style="margin-top: 10px;"># Start development server</div>
                <div style="color: #667eea;">npm run serve</div>
                <div style="margin-top: 10px;"># Run CLI</div>
                <div style="color: #667eea;">npm run cli status</div>
            </div>
        </div>
        
        <footer>
            <div>
                <span class="badge">Node ${process.version}</span>
                <span class="badge">v1.0.0</span>
                <span class="badge">MIT License</span>
            </div>
            <p style="margin-top: 10px;">
                <a href="https://github.com/dcyfr/dcyfr-ai-nodejs" target="_blank" style="color: #667eea; text-decoration: none;">
                    View on GitHub →
                </a>
            </p>
        </footer>
    </div>
</body>
</html>
    `);
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
