interface IAppErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  error?: Record<string, unknown> | null;
  stack?: string | null;
  timestamp: string;
  path?: string;
  method?: string;
}

class AppError extends Error {
  public statusCode: number;
  public errorDetails?: Record<string, unknown>;

  constructor(
    statusCode: number,
    message: string,
    errorDetails?: Record<string, unknown>,
    stack?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errorDetails = errorDetails;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Generate error response
  public toResponse(path?: string, method?: string): IAppErrorResponse {
    return {
      success: false,
      message: this.message,
      statusCode: this.statusCode,
      error: this.errorDetails || null,
      stack:
        process.env.NODE_ENV === "development" ? this.stack || null : undefined,
      timestamp: new Date().toISOString(),
      path,
      method,
    };
  }
}

export default AppError;
