import Joi from "joi";

export const transactionSchema = Joi.object({
  type: Joi.string()
    .valid("incoming", "spending")
    .required()
    .messages({ "any.required": "missing required name field" }),

  category: Joi.string()
    .required()
    .messages({ "any.required": "missing required category field" }),

  sum: Joi.number()
    .required()
    .messages({ "any.required": "missing required sum field" }),

  date: Joi.date()
    .required()
    .messages({ "any.required": "missing required date field" }),

  comment: Joi.string(),
});
