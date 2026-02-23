import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

export const testRegister = asyncHandler(async (req, res) => {
  // If validation passes, you'll get the validated data here
  const response = new ApiResponse(
    200,
    "Validation passed successfully",
    req.body,
  );
  return response.send(res);
});

export const testLogin = asyncHandler(async (req, res) => {
  const response = new ApiResponse(200, "Login validation passed", req.body);
  return response.send(res);
});
