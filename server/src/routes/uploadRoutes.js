import express from "express";
import {
  uploadImage,
  deleteImage,
  getAllImages,
} from "../controllers/uploadController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import upload from "../config/upload.js";

const router = express.Router();

// All routes are protected
router.post("/image", authenticate, upload.single("image"), uploadImage);
router.delete("/image/:filename", authenticate, deleteImage);
router.get("/images", authenticate, getAllImages);

export default router;
