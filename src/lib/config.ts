/**
 * Configuration loader for the application
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

export interface AppConfig {
  telemetry: {
    enabled: boolean;
    level: string;
    endpoints: Array<{
      type: string;
      level?: string;
      path?: string;
    }>;
  };
  validation: {
    enabled: boolean;
    strict: boolean;
  };
  server?: {
    port: number;
    host: string;
  };
}

const DEFAULT_CONFIG: AppConfig = {
  telemetry: {
    enabled: true,
    level: 'info',
    endpoints: [
      { type: 'console', level: 'info' }
    ]
  },
  validation: {
    enabled: true,
    strict: true
  },
  server: {
    port: 3000,
    host: 'localhost'
  }
};

/**
 * Load application configuration
 * Merges default config with environment-specific overrides
 */
export async function loadConfig(): Promise<AppConfig> {
  try {
    // Try to load custom config if it exists
    const configPath = join(process.cwd(), 'config.json');
    const configFile = await readFile(configPath, 'utf-8');
    const customConfig = JSON.parse(configFile) as Partial<AppConfig>;
    
    return {
      ...DEFAULT_CONFIG,
      ...customConfig
    };
  } catch {
    // Use default config if file doesn't exist
    return DEFAULT_CONFIG;
  }
}

/**
 * Get configuration value by path
 */
export function getConfigValue<T = unknown>(
  config: AppConfig,
  path: string
): T | undefined {
  const keys = path.split('.');
  let value: unknown = config;
  
  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return value as T;
}
