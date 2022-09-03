const { Recipe } = require("../recipeModel");
const lodash = require("lodash");

async function generateRecipeNum() {
  while (true) {
    const randomNum = lodash.random(1000000, 9999999);
    const recipe = await Recipe.findOne({ recipeNumber: randomNum });
    if (!recipe) return String(randomNum);
  }
}
exports.generateRecipeNum = generateRecipeNum;
