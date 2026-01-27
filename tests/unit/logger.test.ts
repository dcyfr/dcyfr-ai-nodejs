import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createLogger } from '@/lib/logger';

describe('Logger', () => {
  let consoleOutput: string[] = [];
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  beforeEach(() => {
    consoleOutput = [];
    console.log = (msg: string) => consoleOutput.push(msg);
    console.warn = (msg: string) => consoleOutput.push(msg);
    console.error = (msg: string) => consoleOutput.push(msg);
  });

  afterEach(() => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  });

  it('should create a logger with namespace', () => {
    const logger = createLogger('test');
    expect(logger).toBeDefined();
    expect(logger.info).toBeInstanceOf(Function);
    expect(logger.error).toBeInstanceOf(Function);
  });

  it('should log info messages', () => {
    const logger = createLogger('test');
    logger.info('Test message');
    
    expect(consoleOutput).toHaveLength(1);
    const logEntry = JSON.parse(consoleOutput[0]!);
    expect(logEntry.level).toBe('info');
    expect(logEntry.namespace).toBe('test');
    expect(logEntry.message).toBe('Test message');
  });

  it('should log with metadata', () => {
    const logger = createLogger('test');
    logger.info('User action', { userId: '123', action: 'login' });
    
    const logEntry = JSON.parse(consoleOutput[0]!);
    expect(logEntry.userId).toBe('123');
    expect(logEntry.action).toBe('login');
  });

  it('should support different log levels', () => {
    const logger = createLogger('test');
    
    logger.debug('Debug message');
    logger.info('Info message');
    logger.warn('Warning message');
    logger.error('Error message');
    
    expect(consoleOutput).toHaveLength(4);
    expect(JSON.parse(consoleOutput[0]!).level).toBe('debug');
    expect(JSON.parse(consoleOutput[1]!).level).toBe('info');
    expect(JSON.parse(consoleOutput[2]!).level).toBe('warn');
    expect(JSON.parse(consoleOutput[3]!).level).toBe('error');
  });
});
