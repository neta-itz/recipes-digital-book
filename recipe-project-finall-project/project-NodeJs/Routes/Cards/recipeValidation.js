const Joi = require("joi");

function validateRecipe(recipe) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(256).required(),
    ingredients: Joi.string().min(2).max(2000).required(),
    instructions: Joi.string().min(2).max(2000).required(),
    image: Joi.string().empty(""),
  });
  return schema.validate(recipe);
}
exports.validateRecipe = validateRecipe;
