import Joi from "joi";

export const userSchema = Joi.object({
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

export const subscriprionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

export const emailSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "missing required email field" }),
});

export const balanceSchema = Joi.object({
  balance: Joi.number()
    .required()
    .messages({ "any.required": "missing required balance field" }),
});

export const categorySchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "missing required name field" }),
  type: Joi.string()
    .valid("incoming", "spending")
    .required()
    .messages({ "any.required": "missing required type field" }),
});
