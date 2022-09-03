import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { cloneDeep } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import http from "../../api/http";

import RecipeCard from "../../components/RecipeCardComponenet/RecipeCardComponenet";
import RecipeEdit from "../../components/RecipeCardEditComponenet/RecipeCardEditComponenet";
import "./FoodPanelPage.css";

const FoodPanelPage = () => {
  const history = useHistory();

  const [recipesArr, setRecipesArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState(null);

  const routeChange = () => {
    let path = `newRecipe`;
    history.push(path);
  };

  useEffect(() => {
    http
      .get("/recipes/foodPanel")
      .then((dataFromServer) => {
        setRecipesArr(dataFromServer.data);
      })
      .catch((err) => {
        if (err.response) {
          toast.error("No cards to show");
        }
        localStorage.clear();
      });
  }, []);

  useEffect(() => {
    if (recipesArr.length > 0) {
      setLoaded(true);
    }
  }, [recipesArr]);

  const handleDeleteCard = (id) => {
    let newRecipesArrArr = recipesArr.filter((item) => item._id !== id);
    setRecipesArr(newRecipesArrArr);

    http
      .delete(`/recipes/${id}`)
      .then(() => {
        history.push("/foodPanel");
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Can not delete this card");
        }
      });
  };

  const handleEditRecipeCard = (id) => {
    let newRecipeCard = recipesArr.find((item) => {
      return item._id === id;
    });

    if (newRecipeCard) {
      setSelectedRecipes({ ...newRecipeCard });
    }
  };

  const handleUpdateRecipeCard = (
    name,
    ingredients,
    instructions,
    image,
    id
  ) => {
    let newRecipeCardArr = cloneDeep(recipesArr);
    let newRecipeCard = newRecipeCardArr.find((item) => {
      return item._id === id;
    });
    newRecipeCard.name = name;
    newRecipeCard.ingredients = ingredients;
    newRecipeCard.instructions = instructions;
    newRecipeCard.image = image;
    setRecipesArr(newRecipeCardArr);
    setSelectedRecipes(null);

    http
      .put(`/recipes/${id}`, {
        name,
        ingredients,
        instructions,
        image,
      })
      .then(() => {
        history.push("/foodPanel");
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Can not edit this card");
        }
      });
  };

  return (
    <Fragment>
      <div className="foodPanelBgc">
        <div className="foodPanelHeaderAndBtn">
          <button
            type="button"
            className="btn btn-lg addBtn"
            id="addBtn"
            onClick={routeChange}
          >
            Edd New Recipe
          </button>
          <h1 className="foodPanelHeader">My Food Recipes</h1>
        </div>
        <div className="row row-cols-2 row-cols-md-2 card-row">
          {!loaded && (
            <h1 className="loader">
              loading <br />
              <FontAwesomeIcon className="loaderIcon" icon={faSpinner} />
            </h1>
          )}
          {recipesArr.map((item) => {
            return (
              <RecipeCard
                key={item._id}
                id={item._id}
                name={item.name}
                ingredients={item.ingredients}
                instructions={item.instructions}
                image={item.image}
                onDeleteCard={handleDeleteCard}
                onEditRecipeCard={handleEditRecipeCard}
              ></RecipeCard>
            );
          })}
        </div>
      </div>
      {selectedRecipes !== null && (
        <RecipeEdit
          id={selectedRecipes._id}
          name={selectedRecipes.name}
          ingredients={selectedRecipes.ingredients}
          instructions={selectedRecipes.instructions}
          image={selectedRecipes.image}
          onUpdateRecipeCard={handleUpdateRecipeCard}
        ></RecipeEdit>
      )}
    </Fragment>
  );
};

export default FoodPanelPage;
