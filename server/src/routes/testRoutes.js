import express from "express";
import { testRegister, testLogin } from "../controllers/testController.js";
import { validate } from "../utils/validate.js";
import { registerSchema, loginSchema } from "../validators/exampleValidator.js";

const router = express.Router();

// Test validation routes
router.post("/register", validate(registerSchema), testRegister);
router.post("/login", validate(loginSchema), testLogin);

export default router;
