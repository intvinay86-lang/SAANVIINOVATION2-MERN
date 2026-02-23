import Joi from "joi";

// Example: User registration validation schema
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "The name field is required.",
    "string.min": "The name must be at least 3 characters.",
    "string.max": "The name must not exceed 50 characters.",
    "any.required": "The name field is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "The email field is required.",
    "string.email": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "The password field is required.",
    "string.min": "The password must be at least 6 characters.",
    "any.required": "The password field is required.",
  }),
  password_confirmation: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "The password confirmation does not match.",
      "any.required": "The password confirmation field is required.",
    }),
});

// Example: Login validation schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "The email field is required.",
    "string.email": "The email must be a valid email address.",
    "any.required": "The email field is required.",
  }),
  password: Joi.string().required().messages({
    "string.empty": "The password field is required.",
    "any.required": "The password field is required.",
  }),
});
