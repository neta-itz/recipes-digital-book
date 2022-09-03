import Joi from "joi-browser";

const loginSchema = {
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string()
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
    )
    .required(),
};

export default loginSchema;
