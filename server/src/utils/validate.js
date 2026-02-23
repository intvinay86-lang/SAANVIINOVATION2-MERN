import ApiError from "./ApiError.js";

/**
 * Validate request data against Joi schema
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      // Format errors in Laravel style
      const errors = {};
      error.details.forEach((detail) => {
        const field = detail.path.join(".");
        if (!errors[field]) {
          errors[field] = [];
        }
        errors[field].push(detail.message);
      });

      throw new ApiError(422, "Validation failed", errors);
    }

    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};
