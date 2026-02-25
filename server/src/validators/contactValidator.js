import Joi from "joi";

export const createContactSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required().messages({
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  phone: Joi.string().min(10).max(20).required().messages({
    "string.min": "Phone number must be at least 10 characters",
    "string.max": "Phone number cannot exceed 20 characters",
    "any.required": "Phone number is required",
  }),
  subject: Joi.string().min(3).max(200).required().messages({
    "string.min": "Subject must be at least 3 characters",
    "string.max": "Subject cannot exceed 200 characters",
    "any.required": "Subject is required",
  }),
  message: Joi.string().min(10).max(2000).required().messages({
    "string.min": "Message must be at least 10 characters",
    "string.max": "Message cannot exceed 2000 characters",
    "any.required": "Message is required",
  }),
});

export const updateContactSchema = Joi.object({
  status: Joi.string().valid("new", "read", "replied", "archived").messages({
    "any.only": "Status must be one of: new, read, replied, archived",
  }),
  isRead: Joi.boolean(),
}).min(1);
