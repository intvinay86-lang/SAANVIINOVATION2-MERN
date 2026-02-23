import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Upload image
// @route   POST /api/v1/upload/image
// @access  Private
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  // Generate URL for the uploaded file
  const fileUrl = `/uploads/${req.file.filename}`;

  res.status(200).json(
    new ApiResponse(200, "Image uploaded successfully", {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: fileUrl,
    }),
  );
});

// @desc    Delete image
// @route   DELETE /api/v1/upload/image/:filename
// @access  Private
export const deleteImage = asyncHandler(async (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    throw new ApiError(400, "Filename is required");
  }

  const uploadsDir = path.join(__dirname, "../../uploads");
  const filePath = path.join(uploadsDir, filename);

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, "File not found");
  }

  // Delete the file
  fs.unlinkSync(filePath);

  res
    .status(200)
    .json(new ApiResponse(200, "Image deleted successfully", null));
});

// @desc    Get all uploaded images
// @route   GET /api/v1/upload/images
// @access  Private
export const getAllImages = asyncHandler(async (req, res) => {
  const uploadsDir = path.join(__dirname, "../../uploads");

  // Check if uploads directory exists
  if (!fs.existsSync(uploadsDir)) {
    return res.status(200).json(new ApiResponse(200, "No images found", []));
  }

  // Read all files from uploads directory
  const files = fs.readdirSync(uploadsDir);

  // Filter only image files and get their details
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
  const images = files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .map((file) => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      return {
        filename: file,
        url: `/uploads/${file}`,
        size: stats.size,
        uploadedAt: stats.birthtime,
      };
    });

  res
    .status(200)
    .json(new ApiResponse(200, "Images retrieved successfully", images));
});
