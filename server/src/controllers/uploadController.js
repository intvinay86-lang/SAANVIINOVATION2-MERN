import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Upload from "../models/Upload.js";
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

  // Save upload record to database
  const upload = await Upload.create({
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    url: fileUrl,
    uploadedBy: req.user._id,
  });

  res.status(200).json(
    new ApiResponse(200, "Image uploaded successfully", {
      filename: upload.filename,
      originalName: upload.originalName,
      size: upload.size,
      mimetype: upload.mimetype,
      url: upload.url,
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

  // Find upload record in database
  const upload = await Upload.findOne({ filename });

  if (!upload) {
    throw new ApiError(404, "File not found");
  }

  const uploadsDir = path.join(__dirname, "../../uploads");
  const filePath = path.join(uploadsDir, filename);

  // Delete the physical file if it exists
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  // Delete the database record
  await upload.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, "Image deleted successfully", null));
});

// @desc    Get all uploaded images
// @route   GET /api/v1/upload/images
// @access  Private
export const getAllImages = asyncHandler(async (req, res) => {
  // Get all uploads from database
  const uploads = await Upload.find()
    .populate("uploadedBy", "name email")
    .sort({ createdAt: -1 });

  const images = uploads.map((upload) => ({
    filename: upload.filename,
    originalName: upload.originalName,
    url: upload.url,
    size: upload.size,
    mimetype: upload.mimetype,
    uploadedAt: upload.createdAt,
    uploadedBy: upload.uploadedBy,
  }));

  res
    .status(200)
    .json(new ApiResponse(200, "Images retrieved successfully", images));
});
