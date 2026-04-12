/**
 * Error Handling Utility
 * Centralized error handling, logging, and recovery
 */

export interface ErrorContext {
  operation: string;
  details?: Record<string, any>;
  timestamp: Date;
}

export interface ErrorResult<T = any> {
  success: boolean;
  data?: T;
  error?: Error;
  message: string;
  context?: ErrorContext;
}

/**
 * Error logger (can be extended to send to external service)
 */
class ErrorLogger {
  private logs: Array<{ error: Error; context: ErrorContext }> = [];
  private maxLogs = 100;

  log(error: Error, context: ErrorContext): void {
    this.logs.push({ error, context });
    
    // Keep only recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[${context.operation}]`, error, context.details);
    }
  }

  getLogs(): Array<{ error: Error; context: ErrorContext }> {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }
}

export const errorLogger = new ErrorLogger();

/**
 * Safe async operation wrapper with error handling
 * 
 * @param operation - Name of the operation
 * @param fn - Async function to execute
 * @param fallback - Optional fallback value on error
 * @returns ErrorResult with success status and data/error
 * 
 * @example
 * const result = await safeAsync('generateLetter', async () => {
 *   return generateBorrowerLetter(answers);
 * });
 * 
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.message);
 * }
 */
export const safeAsync = async <T>(
  operation: string,
  fn: () => Promise<T>,
  fallback?: T
): Promise<ErrorResult<T>> => {
  const context: ErrorContext = {
    operation,
    timestamp: new Date()
  };

  try {
    const data = await fn();
    return {
      success: true,
      data,
      message: `${operation} completed successfully`,
      context
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    errorLogger.log(err, context);

    return {
      success: false,
      data: fallback,
      error: err,
      message: `${operation} failed: ${err.message}`,
      context
    };
  }
};

/**
 * Safe sync operation wrapper with error handling
 * 
 * @param operation - Name of the operation
 * @param fn - Function to execute
 * @param fallback - Optional fallback value on error
 * @returns ErrorResult with success status and data/error
 */
export const safeSync = <T>(
  operation: string,
  fn: () => T,
  fallback?: T
): ErrorResult<T> => {
  const context: ErrorContext = {
    operation,
    timestamp: new Date()
  };

  try {
    const data = fn();
    return {
      success: true,
      data,
      message: `${operation} completed successfully`,
      context
    };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    errorLogger.log(err, context);

    return {
      success: false,
      data: fallback,
      error: err,
      message: `${operation} failed: ${err.message}`,
      context
    };
  }
};

/**
 * Retry wrapper for operations that might fail temporarily
 * 
 * @param operation - Name of the operation
 * @param fn - Async function to execute
 * @param maxRetries - Maximum number of retries (default: 3)
 * @param delayMs - Delay between retries in ms (default: 1000)
 * @returns ErrorResult with success status and data/error
 */
export const withRetry = async <T>(
  operation: string,
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<ErrorResult<T>> => {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    const result = await safeAsync(`${operation} (attempt ${attempt}/${maxRetries})`, fn);
    
    if (result.success) {
      return result;
    }

    lastError = result.error;

    // Don't delay after last attempt
    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return {
    success: false,
    error: lastError,
    message: `${operation} failed after ${maxRetries} attempts`,
    context: {
      operation,
      details: { maxRetries, delayMs },
      timestamp: new Date()
    }
  };
};

/**
 * Validation wrapper with custom error messages
 * 
 * @param operation - Name of the operation
 * @param data - Data to validate
 * @param validator - Validation function
 * @param errorMessage - Custom error message
 * @returns ErrorResult with validation status
 */
export const validate = <T>(
  operation: string,
  data: T,
  validator: (data: T) => boolean,
  errorMessage: string
): ErrorResult<T> => {
  try {
    const isValid = validator(data);
    
    if (isValid) {
      return {
        success: true,
        data,
        message: `${operation} validation passed`
      };
    } else {
      const error = new Error(errorMessage);
      errorLogger.log(error, {
        operation,
        details: { data },
        timestamp: new Date()
      });

      return {
        success: false,
        error,
        message: errorMessage
      };
    }
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    errorLogger.log(err, {
      operation,
      details: { data },
      timestamp: new Date()
    });

    return {
      success: false,
      error: err,
      message: `${operation} validation error: ${err.message}`
    };
  }
};

/**
 * User-friendly error message generator
 * 
 * @param error - Error object
 * @param operation - Operation that failed
 * @returns User-friendly error message
 */
export const getUserFriendlyError = (error: Error, operation: string): string => {
  // Network errors
  if (error.message.includes('fetch') || error.message.includes('network')) {
    return `Unable to complete ${operation}. Please check your internet connection and try again.`;
  }

  // Timeout errors
  if (error.message.includes('timeout')) {
    return `${operation} is taking longer than expected. Please try again.`;
  }

  // Validation errors
  if (error.message.includes('invalid') || error.message.includes('required')) {
    return `${operation} failed: ${error.message}`;
  }

  // Generic error
  return `An error occurred during ${operation}. Please try again or contact support if the problem persists.`;
};

/**
 * Error boundary helper for React components
 */
export class ErrorBoundaryHelper {
  static getDerivedStateFromError(error: Error): { hasError: boolean; error: Error } {
    return { hasError: true, error };
  }

  static logError(error: Error, errorInfo: React.ErrorInfo): void {
    errorLogger.log(error, {
      operation: 'React Error Boundary',
      details: { errorInfo },
      timestamp: new Date()
    });
  }
}

/**
 * Create error with context
 */
export const createError = (message: string, context?: Record<string, any>): Error => {
  const error = new Error(message);
  if (context) {
    (error as any).context = context;
  }
  return error;
};