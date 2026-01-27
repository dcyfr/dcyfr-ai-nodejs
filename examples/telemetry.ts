/**
 * Example: Advanced Telemetry
 * 
 * This example demonstrates advanced telemetry features including
 * custom endpoints, log levels, and structured logging.
 */

import { DCYFRFramework } from '@dcyfr/ai';
import { createLogger } from '../src/lib/logger.js';
import { writeFile } from 'fs/promises';
import { join } from 'path';

/**
 * Custom telemetry endpoint that writes to a file
 */
class FileTelemetryEndpoint {
  private logs: string[] = [];
  
  constructor(private filePath: string) {}

  log(level: string, message: string, meta?: Record<string, unknown>): void {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      message,
      ...meta
    });
    this.logs.push(entry);
  }

  async flush(): Promise<void> {
    const content = this.logs.join('\n');
    await writeFile(this.filePath, content, 'utf-8');
    console.log(`📝 Telemetry written to ${this.filePath}`);
  }
}

async function telemetryExample() {
  console.log('📊 DCYFR AI Advanced Telemetry Example\n');

  const logger = createLogger('telemetry-example');
  const telemetryFile = join(process.cwd(), 'telemetry-output.jsonl');
  const fileEndpoint = new FileTelemetryEndpoint(telemetryFile);

  // Initialize framework with telemetry
  const framework = new DCYFRFramework({
    telemetry: {
      enabled: true,
      level: 'debug',
      endpoints: [
        { type: 'console', level: 'info' },
        { type: 'file', path: './dcyfr-telemetry.log', level: 'debug' }
      ]
    },
    validation: {
      enabled: true
    }
  });

  await framework.initialize();

  // Generate telemetry events
  logger.info('Application started', { version: '1.0.0' });
  
  fileEndpoint.log('info', 'User action', { action: 'login', userId: 'user-123' });
  fileEndpoint.log('debug', 'Cache hit', { key: 'user-data', ttl: 300 });
  fileEndpoint.log('warn', 'Slow query detected', { duration: 1500, query: 'SELECT *' });

  // Simulate some operations
  const operations = ['create', 'read', 'update', 'delete'];
  for (const op of operations) {
    logger.info(`Performing ${op} operation`, { operation: op });
    fileEndpoint.log('info', `Operation: ${op}`, { 
      timestamp: Date.now(),
      success: true 
    });
  }

  logger.info('All operations completed');

  // Write telemetry to file
  await fileEndpoint.flush();

  // Cleanup
  await framework.shutdown();
  console.log('\n✅ Telemetry example complete');
  console.log(`📁 Check ${telemetryFile} for telemetry output`);
}

// Run the example
telemetryExample().catch(console.error);
