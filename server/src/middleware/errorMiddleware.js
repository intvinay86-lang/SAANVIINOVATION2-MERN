import ApiError from "../utils/ApiError.js";
import { isDevelopment } from "../config/env.js";

// 404 Not Found Handler
export const notFound = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

// Global Error Handler
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Determine if error is operational (expected) or system error (unexpected)
  const isOperational =
    err.isOperational !== undefined ? err.isOperational : false;

  // For non-operational errors (system errors), hide details in production
  // Also hide details for 500+ status codes in production
  let message = err.message || "Internal Server Error";
  if ((!isOperational || statusCode >= 500) && !isDevelopment) {
    message = "Internal Server Error";
  }

  // Laravel-style error response
  const response = {
    success: false,
    message: message,
  };

  // Add validation errors in Laravel format (field: [messages])
  // Only show errors for operational errors or in development
  if (isOperational || isDevelopment) {
    if (err.errors && Object.keys(err.errors).length > 0) {
      response.errors = err.errors;
    }
  }

  // Add stack trace only in development and 500+ error codes
  if (isDevelopment && statusCode >= 500) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};
