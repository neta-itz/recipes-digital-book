const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  ingredients: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },
  instructions: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 2000,
  },
  image: {
    type: String,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  recipeNumber: {
    type: String,
    required: true,
    minlength: 7,
    maxlength: 7,
    unique: false,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
exports.Recipe = Recipe;
