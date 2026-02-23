import express from "express";
import {
  getAllSiteData,
  getSiteDataByKey,
  createOrUpdateSiteData,
  updateSiteDataByKey,
  deleteSiteDataByKey,
} from "../controllers/siteDataController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validate } from "../utils/validate.js";
import {
  createSiteDataSchema,
  updateSiteDataSchema,
} from "../validators/siteDataValidator.js";

const router = express.Router();

// Public routes
router.get("/", getAllSiteData);
router.get("/:key", getSiteDataByKey);

// Protected routes
router.post(
  "/",
  authenticate,
  validate(createSiteDataSchema),
  createOrUpdateSiteData,
);
router.put(
  "/:key",
  authenticate,
  validate(updateSiteDataSchema),
  updateSiteDataByKey,
);
router.delete("/:key", authenticate, deleteSiteDataByKey);

export default router;
