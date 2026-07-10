export const logger = {
  log: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.log("[LOG]:", ...args);
    }
  },

  warn: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.warn("[WARNING]:", ...args);
    }
  },

  // FIX M-7: Always log errors, even in production.
  error: (...args) => {
    // Always output to console so errors are not swallowed
    console.error("[ERROR]:", ...args);

    // Optionally send to an error reporting service (e.g., Sentry)
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Example placeholder: you can integrate Sentry or LogRocket here
      // import * as Sentry from '@sentry/nextjs';
      // Sentry.captureException(...args);
    }
  },
};
