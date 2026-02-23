import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const healthCheck = asyncHandler(async (req, res) => {
  const response = new ApiResponse(200, "Server running successfully");
  return response.send(res);
});
