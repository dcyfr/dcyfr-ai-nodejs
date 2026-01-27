/**
 * Type definitions for the application
 */

/**
 * Generic result type for operations that can fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Async result type
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors?: ValidationError[];
}

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

/**
 * Framework event types
 */
export type FrameworkEvent =
  | { type: 'initialized'; timestamp: number }
  | { type: 'shutdown'; timestamp: number }
  | { type: 'error'; error: Error; timestamp: number }
  | { type: 'validation'; result: ValidationResult; timestamp: number };

/**
 * Plugin interface
 */
export interface Plugin {
  name: string;
  version: string;
  initialize: () => Promise<void> | void;
  shutdown?: () => Promise<void> | void;
}
