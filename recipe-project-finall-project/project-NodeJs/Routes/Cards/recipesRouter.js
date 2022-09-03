const { Recipe } = require("./recipeModel");
const { generateRecipeNum } = require("./services/generateRecipeNum");
const { validateRecipe } = require("./recipeValidation");
const express = require("express");
const auth = require("../../middlewares/authorization");
const router = express.Router();
const chalk = require("chalk");

router.get("/allRecipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res.send(recipes);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/recipe/:id", async (req, res) => {
  try {
    const recipeID = req.params.id;
    const recipe = await Recipe.findOne({ _id: recipeID });
    return res.send(recipe);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.get("/foodPanel", auth, (req, res) => {
  let user = req.user;
  Recipe.find({ userID: user._id })
    .then((recipes) => {
      res.json(recipes);
    })
    .catch((error) => res.status(500).send(error.message));
});

router.post("/", auth, async (req, res) => {
  try {
    const user = req.user;

    let recipe = req.body;
    console.log({ recipe });
    const { error } = validateRecipe(recipe);
    if (error) {
      console.log(chalk.redBright(error.details[0].message));
      return res.status(400).send(error.details[0].message);
    }

    const recipeNumber = await generateRecipeNum();

    recipe = {
      name: recipe.name,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image
        ? recipe.image
        : "https://i.pinimg.com/236x/b9/68/55/b96855ea6cf457549b4ef7a3fcebf90c.jpg",
      userID: user._id,
      recipeNumber,
    };

    recipe = new Recipe(recipe);
    await recipe.save();
    return res.send(recipe);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    let user = req.user;

    let recipe = req.body;
    console.log({ recipe });
    const { error } = validateRecipe(recipe);
    if (error) {
      const errorMessage = error.details[0].message;
      console.log(errorMessage);
      return res.status(400).send(errorMessage);
    }

    const filter = {
      _id: req.params.id,
      userID: user._id,
    };

    recipe = await Recipe.findOneAndUpdate(filter, recipe);
    if (!recipe) {
      console.log(chalk.redBright("No recipe with this ID in the database!"));
      return res.status(404).send("No recipe with this ID in the database!");
    }
    recipe = await Recipe.findById(recipe._id);
    return res.send(recipe);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.user;

    const recipeID = req.params.id;
    let recipe = await Recipe.findById(recipeID);

    if (user.admin || recipe.userID.toString() === user._id) {
      recipe = await Recipe.findOneAndRemove({ _id: recipeID });
      return res.send(recipe);
    }
    console.log(chalk.redBright("Un authorized user!"));
    return res.status(403).send("You are noe authorize to delete cards");
  } catch (error) {
    console.log(chalk.redBright("Could not delete card:", error.message));
    return res.status(500).send(error.message);
  }
});

module.exports = router;
