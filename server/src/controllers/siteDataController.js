import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import SiteData from "../models/SiteData.js";

// @desc    Get all site data
// @route   GET /api/v1/sitedata
// @access  Public
export const getAllSiteData = asyncHandler(async (req, res) => {
  const siteData = await SiteData.find();

  res
    .status(200)
    .json(new ApiResponse(200, "Site data retrieved successfully", siteData));
});

// @desc    Get site data by key
// @route   GET /api/v1/sitedata/:key
// @access  Public
export const getSiteDataByKey = asyncHandler(async (req, res) => {
  const siteData = await SiteData.findOne({ dataKey: req.params.key });

  if (!siteData) {
    throw new ApiError(404, "Site data not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Site data retrieved successfully", siteData));
});

// @desc    Create or update site data
// @route   POST /api/v1/sitedata
// @access  Private
export const createOrUpdateSiteData = asyncHandler(async (req, res) => {
  const { dataKey, data } = req.body;

  if (!dataKey || !data) {
    throw new ApiError(400, "dataKey and data are required");
  }

  // Check if site data with this key already exists
  let siteData = await SiteData.findOne({ dataKey });

  if (siteData) {
    // Update existing
    siteData.data = data;
    await siteData.save();

    res
      .status(200)
      .json(new ApiResponse(200, "Site data updated successfully", siteData));
  } else {
    // Create new
    siteData = await SiteData.create({
      dataKey,
      data,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "Site data created successfully", siteData));
  }
});

// @desc    Update site data by key
// @route   PUT /api/v1/sitedata/:key
// @access  Private
export const updateSiteDataByKey = asyncHandler(async (req, res) => {
  const { data } = req.body;

  if (!data) {
    throw new ApiError(400, "data is required");
  }

  const siteData = await SiteData.findOne({ dataKey: req.params.key });

  if (!siteData) {
    throw new ApiError(404, "Site data not found");
  }

  siteData.data = data;
  await siteData.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Site data updated successfully", siteData));
});

// @desc    Delete site data by key
// @route   DELETE /api/v1/sitedata/:key
// @access  Private
export const deleteSiteDataByKey = asyncHandler(async (req, res) => {
  const siteData = await SiteData.findOne({ dataKey: req.params.key });

  if (!siteData) {
    throw new ApiError(404, "Site data not found");
  }

  await siteData.deleteOne();

  res
    .status(200)
    .json(new ApiResponse(200, "Site data deleted successfully", null));
});
