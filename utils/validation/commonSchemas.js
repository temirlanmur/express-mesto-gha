const { Joi } = require('celebrate');

const commonSchemas = {
  id: Joi.string().alphanum().length(24),
  url: Joi.string().uri(),
};

module.exports = commonSchemas;
