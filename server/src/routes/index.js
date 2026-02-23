import express from "express";
import healthRoutes from "./healthRoutes.js";

const router = express.Router();

// Mount all routes here
router.use("/health", healthRoutes);

export default router;
