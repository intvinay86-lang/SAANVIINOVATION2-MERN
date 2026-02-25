import express from "express";
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  getContactStats,
} from "../controllers/contactController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { validate } from "../utils/validate.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../validators/contactValidator.js";

const router = express.Router();

// Public route - anyone can submit a contact form
router.post("/", validate(createContactSchema), createContact);

// Stats route (must come before /:id)
router.get("/stats", authenticate, getContactStats);

// Protected routes - only authenticated users can view/manage contacts
router.get("/", authenticate, getAllContacts);
router.get("/:id", authenticate, getContactById);
router.put("/:id", authenticate, validate(updateContactSchema), updateContact);
router.delete("/:id", authenticate, deleteContact);

export default router;
