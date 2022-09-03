import Joi from "joi-browser";

const recipeSchema = {
  name: Joi.string().min(2).max(256).required(),
  ingredients: Joi.string().min(2).max(2000).required(),
  instructions: Joi.string().min(10).max(2000).required(),
  image: Joi.string().empty(""),
};

export default recipeSchema;
