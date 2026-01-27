import { describe, it, expect } from 'vitest';
import { loadConfig, getConfigValue } from '@/lib/config';

describe('Config', () => {
  it('should load default config', async () => {
    const config = await loadConfig();
    
    expect(config).toBeDefined();
    expect(config.telemetry).toBeDefined();
    expect(config.validation).toBeDefined();
  });

  it('should have telemetry enabled by default', async () => {
    const config = await loadConfig();
    
    expect(config.telemetry.enabled).toBe(true);
    expect(config.telemetry.level).toBe('info');
  });

  it('should have validation enabled by default', async () => {
    const config = await loadConfig();
    
    expect(config.validation.enabled).toBe(true);
    expect(config.validation.strict).toBe(true);
  });

  it('should get config value by path', async () => {
    const config = await loadConfig();
    
    const telemetryEnabled = getConfigValue<boolean>(config, 'telemetry.enabled');
    expect(telemetryEnabled).toBe(true);
    
    const validationStrict = getConfigValue<boolean>(config, 'validation.strict');
    expect(validationStrict).toBe(true);
  });

  it('should return undefined for non-existent path', async () => {
    const config = await loadConfig();
    
    const value = getConfigValue(config, 'nonexistent.path');
    expect(value).toBeUndefined();
  });
});
