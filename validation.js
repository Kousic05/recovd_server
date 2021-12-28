const Joi = require("@hapi/joi");

//Register validation
const registerValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required().max(9999999999),
  });
  return schema.validate(data);
};

module.exports.registerValidate = registerValidate;

//Login validation
const loginValidate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    phone_number: Joi.string().required().max(9999999999),
  });
  return schema.validate(data);
};

module.exports.loginValidate = loginValidate;
