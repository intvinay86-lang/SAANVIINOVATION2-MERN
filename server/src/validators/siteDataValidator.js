import Joi from "joi";

export const createSiteDataSchema = Joi.object({
  dataKey: Joi.string().required().messages({
    "any.required": "dataKey is required",
    "string.empty": "dataKey cannot be empty",
  }),
  data: Joi.object().required().messages({
    "any.required": "data is required",
    "object.base": "data must be an object",
  }),
});

export const updateSiteDataSchema = Joi.object({
  data: Joi.object().required().messages({
    "any.required": "data is required",
    "object.base": "data must be an object",
  }),
});
