import express from "express";
import healthRoutes from "./healthRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import siteDataRoutes from "./siteDataRoutes.js";
import uploadRoutes from "./uploadRoutes.js";

const router = express.Router();

// Mount all routes here
router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/sitedata", siteDataRoutes);
router.use("/upload", uploadRoutes);

export default router;
