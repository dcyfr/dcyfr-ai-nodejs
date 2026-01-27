/**
 * DCYFR AI-powered Node.js & TypeScript Starter Template
 * 
 * This is the main entry point for your application.
 * It demonstrates how to integrate DCYFR AI framework into a Node.js project.
 * 
 * NOTE: This template is designed to work with @dcyfr/ai when it's published.
 * For now, it provides a working starter without the actual framework dependency.
 */

import { createLogger } from './lib/logger.js';
import { loadConfig } from './lib/config.js';

const logger = createLogger('main');

/**
 * Initialize DCYFR AI framework with configuration
 * 
 * TODO: Uncomment when @dcyfr/ai is available
 */
async function initializeFramework(): Promise<void> {
  const config = await loadConfig();
  
  logger.info('DCYFR AI Framework configuration loaded', {
    telemetry: config.telemetry.enabled,
    validation: config.validation.enabled
  });
  
  // Framework initialization will go here when @dcyfr/ai is available
  // const framework = new DCYFRFramework(frameworkConfig);
  // await framework.initialize();
  
  logger.info('Application initialized (framework integration pending)');
}

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    logger.info('Starting DCYFR AI-powered Node.js application...');
    
    // Initialize the framework
    await initializeFramework();
    
    // Your application logic here
    logger.info('Application started successfully');
    logger.info('This is a starter template - add your custom logic here!');
    
    // Graceful shutdown handler
    process.on('SIGINT', async () => {
      logger.info('Shutting down...');
      // await framework.shutdown();
      process.exit(0);
    });
    
  } catch (error) {
    logger.error('Application failed to start', { error });
    process.exit(1);
  }
}

// Run the application
main();

// Export for testing
export { initializeFramework, main };
