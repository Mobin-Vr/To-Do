import { AppError } from "@/app/_lib/errors";

/**
 * Wraps an async server function. If an AppError is thrown, it re-throws
 * it unchanged (so the boundary can show the specific message). For any
 * other error, it logs the full error in development and throws a new
 * AppError with a generic, safe message for the user.
 *
 * Use in Server Actions, Route Handlers, or inside Server Components
 * when you want to catch unexpected failures.
 */
export async function handleAsyncError(fn) {
  try {
    return await fn();
  } catch (error) {
    // Log the full error in development only
    if (process.env.NODE_ENV === "development") {
      console.error("[DEV ERROR]", error);
    }

    // If it's already an AppError, just re-throw it
    if (error instanceof AppError) {
      throw error;
    }

    // Otherwise, replace it with a generic public error
    throw new AppError("Something went wrong. Please try again.", 500);
  }
}
