/**
 * DCYFR AI-powered Node.js & TypeScript Starter Template
 * 
 * Main entry point for the Express web server.
 * 
 * Usage:
 *   npm run serve      - Start development server
 *   npm run dev        - Start with hot reload
 *   npm start          - Start production server
 */

import { startServer } from './server.js';
import { createLogger } from './lib/logger.js';

const logger = createLogger('main');

/**
 * Main application entry point
 * Starts the Express web server
 */
async function main(): Promise<void> {
  try {
    const port = parseInt(process.env.PORT || '3000', 10);
    logger.info('Starting DCYFR AI web server...', { port });
    await startServer(port);
  } catch (error) {
    logger.error('Application failed to start', { 
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error 
    });
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the application
main();

// Export for testing
export { main };

