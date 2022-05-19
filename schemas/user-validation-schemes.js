const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(3).max(24),
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),

  password: Joi.string()
    .min(6)
    .max(1024)
    .required()
    .messages({ "any.required": "missing required password field" }),
});

const subscriprionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

module.exports = { userSchema, subscriprionSchema, emailSchema };
