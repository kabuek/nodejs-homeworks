const Joi = require("joi");

const addNew = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)

    .required(),
});

const update = Joi.object({
  name: Joi.string().min(3).max(30),

  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/),
});

module.exports = { addNew, update };
