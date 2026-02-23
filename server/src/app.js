import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/index.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { isDevelopment } from "./config/env.js";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Morgan logging only in development
if (isDevelopment) {
  app.use(morgan("dev"));
}

// API Routes - All routes will be prefixed with /api/v1
app.use("/api/v1", routes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
