import express from "express";
import healthRoutes from "./healthRoutes.js";
import testRoutes from "./testRoutes.js";

const router = express.Router();

// Mount all routes here
router.use("/health", healthRoutes);
router.use("/test", testRoutes);

export default router;
