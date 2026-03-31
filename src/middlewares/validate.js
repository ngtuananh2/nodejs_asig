const Joi = require('joi');
const ApiError = require('../utils/ApiError');

const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const postSchema = Joi.object({
  title: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
  tags: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().allow('')
  ),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (!error) {
    return next();
  }

  const details = error.details.map((item) => item.message).join(', ');
  return next(new ApiError(400, details));
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  postSchema,
};
