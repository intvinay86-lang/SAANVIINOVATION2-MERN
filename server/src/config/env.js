import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/default_db",
  JWT_SECRET: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CORS_ORIGIN:
    process.env.CORS_ORIGIN || "http://localhost:5173,http://localhost:3000",
};

export const isDevelopment = ENV.NODE_ENV === "development";
export const isProduction = ENV.NODE_ENV === "production";
export const isTest = ENV.NODE_ENV === "test";

// Parse CORS origins from comma-separated string
export const getCorsOrigins = () => {
  return ENV.CORS_ORIGIN.split(",").map((origin) => origin.trim());
};
