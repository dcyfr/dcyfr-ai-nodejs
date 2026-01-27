/**
 * Example: Basic DCYFR AI usage
 * 
 * This example demonstrates the fundamentals of using DCYFR AI
 * in a Node.js application.
 */

import { ValidationFramework, TelemetryEngine } from '@dcyfr/ai';
import type { FrameworkConfig } from '@dcyfr/ai';

async function basicExample() {
  console.log('🚀 DCYFR AI Basic Example\n');

  // 1. Initialize telemetry
  const telemetry = new TelemetryEngine({
    enabled: true,
    storage: 'memory'
  });
  console.log('✅ Telemetry initialized\n');

  // 2. Initialize validation framework
  const validation = new ValidationFramework({
    enabled: true,
    gates: [],
    reporters: ['console']
  });
  console.log('✅ Validation framework initialized\n');

  // 3. Run validation
  const result = await validation.runGates([]);
  
  if (result.passed) {
    console.log('✅ Validation passed');
    console.log('Violations:', result.violations.length);
  } else {
    console.log('❌ Validation failed');
    console.log('Violations:', result.violations);
  }

  // 4. Cleanup
  await telemetry.shutdown?.();
  console.log('\n✅ Framework shutdown complete');
}

// Run the example
basicExample().catch(console.error);
