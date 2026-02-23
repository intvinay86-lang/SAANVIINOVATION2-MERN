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
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: err.errors || [],
    stack: isDevelopment ? err.stack : undefined,
  });
};
