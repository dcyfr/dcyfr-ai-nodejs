/**
 * DCYFR AI-powered Node.js & TypeScript Starter Template
 * 
 * This is the main entry point for your application.
 * It demonstrates how to integrate DCYFR AI framework into a Node.js project.
 */

import { 
  ValidationFramework, 
  TelemetryEngine
} from '@dcyfr/ai';
import { createLogger } from './lib/logger.js';
import { loadConfig } from './lib/config.js';

const logger = createLogger('main');

/**
 * Initialize DCYFR AI framework with configuration
 */
async function initializeFramework(): Promise<{ validation: ValidationFramework; telemetry: TelemetryEngine }> {
  const config = await loadConfig();
  
  // Initialize telemetry engine
  const telemetry = new TelemetryEngine({
    enabled: config.telemetry.enabled,
    storage: 'file',
    storagePath: '.dcyfr/telemetry'
  });
  
  // Initialize validation framework
  const validation = new ValidationFramework({
    enabled: config.validation.enabled,
    gates: [],
    reporters: ['console']
  });
  
  logger.info('DCYFR AI Framework initialized successfully');
  
  return { validation, telemetry };
}

/**
 * Main application entry point
 */
async function main(): Promise<void> {
  try {
    logger.info('Starting DCYFR AI-powered Node.js application...');
    
    // Initialize the framework
    const { validation, telemetry } = await initializeFramework();
    
    // Your application logic here
    logger.info('Application started successfully');
    
    // Example: Use validation framework
    const validationResult = await validation.runGates([]);
    logger.info('Validation check complete', { 
      passed: validationResult.passed,
      violations: validationResult.violations.length 
    });
    
    // Graceful shutdown handler
    process.on('SIGINT', async () => {
      logger.info('Shutting down...');
      await telemetry.shutdown?.();
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

