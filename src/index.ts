/**
 * DCYFR AI-powered Node.js & TypeScript Starter Template
 * 
 * Main entry point that supports both web server and CLI modes.
 * 
 * Usage:
 *   npm run serve      - Start web server
 *   npm run cli        - Run CLI commands
 *   npm start          - Default: start web server
 */

import { startServer } from './server.js';
import { runCLI } from './cli.js';
import { createLogger } from './lib/logger.js';

const logger = createLogger('main');

/**
 * Main application entry point
 * Determines mode based on command line arguments
 */
async function main(): Promise<void> {
  try {
    const args = process.argv.slice(2);
    
    // If no arguments, start the web server by default
    if (args.length === 0) {
      logger.info('Starting DCYFR AI web server (default mode)...');
      await startServer(3000);
      return;
    }
    
    // Check if running as CLI
    if (args[0] === 'cli' || process.argv[1]?.includes('cli.')) {
      runCLI();
      return;
    }
    
    // Default to server mode
    logger.info('Starting DCYFR AI web server...');
    await startServer(3000);
    
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

