/**
 * Example: Plugin System
 * 
 * This example shows how to create and use custom plugins
 * with the DCYFR AI framework.
 */

import { DCYFRFramework } from '@dcyfr/ai';
import type { Plugin } from '../src/types/index.js';

/**
 * Example custom plugin: Request Logger
 */
class RequestLoggerPlugin implements Plugin {
  name = 'request-logger';
  version = '1.0.0';
  
  private requestCount = 0;

  async initialize(): Promise<void> {
    console.log(`[${this.name}] Plugin initialized`);
  }

  logRequest(method: string, path: string): void {
    this.requestCount++;
    console.log(`[${this.name}] Request #${this.requestCount}: ${method} ${path}`);
  }

  getStats() {
    return {
      totalRequests: this.requestCount
    };
  }

  async shutdown(): Promise<void> {
    console.log(`[${this.name}] Total requests processed: ${this.requestCount}`);
  }
}

/**
 * Example custom plugin: Data Transformer
 */
class DataTransformerPlugin implements Plugin {
  name = 'data-transformer';
  version = '1.0.0';

  async initialize(): Promise<void> {
    console.log(`[${this.name}] Plugin initialized`);
  }

  transform<T>(data: T, transformFn: (item: T) => T): T {
    console.log(`[${this.name}] Transforming data...`);
    return transformFn(data);
  }
}

async function pluginExample() {
  console.log('🔌 DCYFR AI Plugin System Example\n');

  // Initialize framework with plugins
  const framework = new DCYFRFramework({
    telemetry: { enabled: true },
    plugins: {
      autoLoad: false, // Manual plugin registration
      paths: []
    }
  });

  await framework.initialize();

  // Register custom plugins
  const loggerPlugin = new RequestLoggerPlugin();
  const transformerPlugin = new DataTransformerPlugin();

  await loggerPlugin.initialize();
  await transformerPlugin.initialize();

  console.log('\n📝 Simulating application activity...\n');

  // Use the plugins
  loggerPlugin.logRequest('GET', '/api/users');
  loggerPlugin.logRequest('POST', '/api/users');
  loggerPlugin.logRequest('GET', '/api/products');

  const userData = { name: 'John', role: 'user' };
  const transformed = transformerPlugin.transform(userData, (data) => ({
    ...data,
    role: data.role.toUpperCase()
  }));

  console.log('Transformed data:', transformed);

  // Get plugin stats
  console.log('\n📊 Plugin Statistics:');
  console.log(loggerPlugin.getStats());

  // Cleanup
  await loggerPlugin.shutdown();
  await framework.shutdown();
  console.log('\n✅ All plugins shutdown complete');
}

// Run the example
pluginExample().catch(console.error);
