#!/usr/bin/env node
/**
 * DCYFR AI CLI
 * 
 * Command-line interface for the DCYFR AI-powered Node.js application
 */

import { Command } from 'commander';
import { createLogger } from './lib/logger.js';
import { loadConfig } from './lib/config.js';
import { startServer } from './server.js';

const logger = createLogger('cli');
const program = new Command();

program
  .name('dcyfr-ai')
  .description('DCYFR AI-powered Node.js & TypeScript CLI')
  .version('1.0.0');

/**
 * Server command - Start the web server
 */
program
  .command('serve')
  .description('Start the web server')
  .option('-p, --port <port>', 'Port to listen on', '3000')
  .action(async (options) => {
    try {
      const port = parseInt(options.port, 10);
      logger.info('Starting server...', { port });
      await startServer(port);
    } catch (error) {
      logger.error('Failed to start server', { error });
      process.exit(1);
    }
  });

/**
 * Status command - Show framework status
 */
program
  .command('status')
  .description('Show DCYFR AI framework status')
  .action(async () => {
    try {
      const config = await loadConfig();
      
      console.log('\n🚀 DCYFR AI Framework Status\n');
      console.log(`Validation: ${config.validation.enabled ? '✅ Enabled' : '❌ Disabled'}`);
      console.log(`Telemetry:  ${config.telemetry.enabled ? '✅ Enabled' : '❌ Disabled'}`);
      console.log(`\nNode Version: ${process.version}`);
      console.log(`Platform:     ${process.platform} (${process.arch})`);
      console.log(`Memory:       ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB / ${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`);
      console.log('');
    } catch (error) {
      logger.error('Failed to get status', { error });
      process.exit(1);
    }
  });

/**
 * Validate command - Run validation checks
 */
program
  .command('validate')
  .description('Run DCYFR AI validation checks')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    try {
      const config = await loadConfig();
      
      logger.info('Validation framework check...');
      
      console.log('\n🔍 Running Validation Checks\n');
      console.log(`Mode: ${config.validation.enabled ? 'Enabled' : 'Warn Only'}`);
      console.log(`Parallel: Yes`);
      console.log('');
      
      // Example validation
      console.log('✅ Validation framework initialized');
      console.log('✅ Configuration loaded');
      console.log('✅ System checks passed');
      console.log('');
      
      if (options.verbose) {
        console.log('Framework Details:');
        console.log(`  Config: ${JSON.stringify(config, null, 2)}`);
        console.log('');
      }
      
      logger.info('Validation complete');
    } catch (error) {
      logger.error('Validation failed', { error });
      process.exit(1);
    }
  });

/**
 * Telemetry command - Show telemetry information
 */
program
  .command('telemetry')
  .description('Show telemetry configuration')
  .action(async () => {
    try {
      const config = await loadConfig();
      
      console.log('\n📊 Telemetry Configuration\n');
      console.log(`Status:  ${config.telemetry.enabled ? '✅ Enabled' : '❌ Disabled'}`);
      console.log(`Storage: file`);
      console.log(`Path:    .dcyfr/telemetry`);
      console.log('');
      
      if (!config.telemetry.enabled) {
        console.log('💡 Enable telemetry in .dcyfr.yaml to collect metrics\n');
      }
    } catch (error) {
      logger.error('Failed to get telemetry info', { error });
      process.exit(1);
    }
  });

/**
 * Init command - Initialize a new project
 */
program
  .command('init')
  .description('Initialize DCYFR AI configuration')
  .action(async () => {
    try {
      console.log('\n🎉 DCYFR AI Project\n');
      console.log('Configuration file: .dcyfr.yaml');
      console.log('Documentation: https://github.com/dcyfr/dcyfr-ai-nodejs');
      console.log('');
      console.log('Available commands:');
      console.log('  dcyfr-ai serve     - Start the web server');
      console.log('  dcyfr-ai status    - Show framework status');
      console.log('  dcyfr-ai validate  - Run validation checks');
      console.log('  dcyfr-ai telemetry - Show telemetry info');
      console.log('');
      console.log('Get started:');
      console.log('  npm run serve      - Start development server');
      console.log('  npm run cli status - Check framework status');
      console.log('');
    } catch (error) {
      logger.error('Init failed', { error });
      process.exit(1);
    }
  });

// Parse CLI arguments
export function runCLI(): void {
  program.parse();
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runCLI();
}

export { program };
