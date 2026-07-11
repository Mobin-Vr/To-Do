/**
 * Custom application error with a public message for the user.
 * Use this when you want to show a specific, user-friendly message
 * (e.g., validation, permission, known API failures).
 *
 * Any unhandled error that is NOT an AppError will be converted to
 * a generic message in production automatically.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}
