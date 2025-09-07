const Joi = require('joi');

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { 
      abortEarly: false,
      stripUnknown: true 
    });
    
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));
      
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }
    
    // Replace req.body with validated and sanitized data
    req.body = value;
    next();
  };
};

// User registration schema
const userRegistrationSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .required()
    .messages({
      'string.min': 'Username must be between 3 and 30 characters',
      'string.max': 'Username must be between 3 and 30 characters',
      'string.pattern.base': 'Username can only contain letters, numbers, and underscores',
      'any.required': 'Username is required'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'any.required': 'Password is required'
    })
});

// User login schema
const userLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .optional()
    .messages({
      'string.email': 'Please provide a valid email address'
    }),
  username: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z0-9_]+$/)
    .optional()
    .messages({
      'string.min': 'Username must be between 3 and 30 characters',
      'string.max': 'Username must be between 3 and 30 characters',
      'string.pattern.base': 'Username can only contain letters, numbers, and underscores'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
}).or('email', 'username').messages({
  'object.missing': 'Either email or username is required'
});

// Task schema
const taskSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.min': 'Task title is required',
      'string.max': 'Title cannot exceed 100 characters',
      'any.required': 'Task title is required'
    }),
  description: Joi.string()
    .trim()
    .max(500)
    .allow('')
    .optional()
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),
  status: Joi.string()
    .valid('pending', 'completed')
    .optional()
    .messages({
      'any.only': 'Status must be either pending or completed'
    })
});

// Validation middleware functions
const validateUserRegistration = validate(userRegistrationSchema);
const validateUserLogin = validate(userLoginSchema);
const validateTask = validate(taskSchema);

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateTask
};
