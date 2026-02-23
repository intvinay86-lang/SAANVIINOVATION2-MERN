import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  changePassword,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validate } from "../utils/validate.js";
import {
  createUserSchema,
  updateUserSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/userValidator.js";

const router = express.Router();

// Profile routes (must come before /:id routes)
router.get("/me", authenticate, getMe);
router.put("/me", authenticate, validate(updateProfileSchema), updateMe);
router.put(
  "/me/password",
  authenticate,
  validate(changePasswordSchema),
  changePassword,
);

// CRUD routes
router.get("/", authenticate, getAllUsers);
router.post("/", authenticate, validate(createUserSchema), createUser);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, validate(updateUserSchema), updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
