import { Fragment } from "react";
import { useContext } from "react";
import Context from "../../context";

import RecipeCard from "../../components/RecipeCardComponenet/RecipeCardComponenet";
import "./FavoritePage.css";

const FavoritePage = () => {
  const { favorites, getFavorites } = useContext(Context);

  return (
    <Fragment>
      <div className="favoriteContainer">
        <h1 className="favoriteHeader">My Favorites Recipes</h1>
        <div className="row row-cols-2 row-cols-md-2 card-row">
          {favorites.map((item) => {
            return (
              <RecipeCard
                key={item._id}
                id={item._id}
                name={item.name}
                ingredients={item.ingredients}
                instructions={item.instructions}
                image={item.image}
              ></RecipeCard>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default FavoritePage;
