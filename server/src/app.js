import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { isDevelopment, getCorsOrigins } from "./config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - allow frontend to access backend
app.use(
  cors({
    origin: getCorsOrigins(),
    credentials: true,
  }),
);

// Helmet configuration - allow images to be loaded
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

// Morgan logging only in development
if (isDevelopment) {
  app.use(morgan("dev"));
}

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API Routes - All routes will be prefixed with /api/v1
app.use("/api/v1", routes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
