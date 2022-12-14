const Joi = require("Joi");

function validateSignIn(req) {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string()
      .regex(
        new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,}$")
      )
      .required(),
  });

  return schema.validate(req);
}

module.exports = validateSignIn;
