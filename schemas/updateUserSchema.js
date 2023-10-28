const Joi = require("joi");

const updateUserSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = updateUserSchema;
