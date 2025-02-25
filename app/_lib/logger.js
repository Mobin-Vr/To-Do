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

  error: (...args) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[ERROR]:", ...args);
    }
  },
};
