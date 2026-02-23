import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
export const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const users = await User.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await User.countDocuments(query);

  res.status(200).json(
    new ApiResponse(200, "Users retrieved successfully", {
      users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    }),
  );
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "User retrieved successfully", user));
});

// @desc    Create new user
// @route   POST /api/v1/users
// @access  Private
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json(new ApiResponse(201, "User created successfully", user));
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isActive } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Check if email is being changed and if it already exists
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already exists");
    }
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (isActive !== undefined) user.isActive = isActive;

  await user.save();

  res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Prevent user from deleting themselves
  if (user._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  await user.deleteOne();

  res.status(200).json(new ApiResponse(200, "User deleted successfully", null));
});

// @desc    Get current user profile
// @route   GET /api/v1/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res
    .status(200)
    .json(new ApiResponse(200, "Profile retrieved successfully", user));
});

// @desc    Update current user profile
// @route   PUT /api/v1/users/me
// @access  Private
export const updateMe = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  // Check if email is being changed and if it already exists
  if (email && email !== user.email) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "Email already exists");
    }
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", user));
});

// @desc    Change password
// @route   PUT /api/v1/users/me/password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(401, "Current password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully", null));
});
