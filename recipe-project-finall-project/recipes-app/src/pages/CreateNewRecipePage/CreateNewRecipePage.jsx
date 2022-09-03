import { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Joi from "joi-browser";
import http from "../../api/http";

import recipeSchema from "../../validation/recipe.validation";
import "./CreateNewRecipePage.css";

const NewRecipePage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleIngredients = (event) => {
    setIngredients(event.target.value);
  };
  const handleInstructions = (event) => {
    setInstructions(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.value);
  };
  const handleNewRecipe = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate(
      { name, ingredients, instructions, image },
      recipeSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedValue;

    if (error) {
      toast.error(
        "Please enter valide name, ingredients, instructions and image"
      );
    } else {
      http
        .post("/recipes/", { name, ingredients, instructions, image })
        .then(history.push("/foodPanel"))
        .catch((err) => {
          if (err.response) {
            toast.error("Please enter all caracters required");
          }
        });
    }
  };
  return (
    <div className=" newFoodRecipeBgc">
      <h1 className="newRecipeHeader">Create New Recipe</h1>
      <div className="newRecipeForm d-flex align-items-center justify-content-center">
        <form onSubmit={handleNewRecipe}>
          <div className="form-row">
            <div className="form-group sm-1 md-3 col-l-12">
              <label htmlFor="inputName4" className="foodRecipeLabel">
                Name of recipe:
              </label>
              <input
                type="name"
                className="form-control"
                id="inputName4"
                placeholder="name of recipe"
                value={name}
                onChange={handleName}
              />
            </div>

            <div className="form-group sm-1 md-3 col-l-12">
              <label htmlFor="inputImage" className="foodRecipeLabel">
                Image:
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="image"
                value={image}
                onChange={handleImage}
              />
            </div>
          </div>

          <div className="form-group sm-1 md-3 col-l-12">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="foodRecipeLabel"
            >
              Ingredients:
            </label>
            <textarea
              className="form-control"
              id="ingredientsTextarea1"
              placeholder="ingredients"
              rows="5"
              value={ingredients}
              onChange={handleIngredients}
            ></textarea>
          </div>

          <div className="form-group sm-1 md-3 col-l-12">
            <label
              htmlFor="exampleFormControlTextarea1"
              className="foodRecipeLabel"
            >
              Instructions:
            </label>
            <textarea
              className="form-control"
              id="instructionsTextarea1"
              placeholder="instructions"
              rows="5"
              value={instructions}
              onChange={handleInstructions}
            ></textarea>
          </div>

          <br />
          <button type="submit" className="btn newRecipeBtn">
            Create New Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRecipePage;
