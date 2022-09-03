import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useContext } from "react";

import http from "../../api/http";
import Context from "../../context";
import "./RecipeCardComponenet.css";

const RecipeCard = (props) => {
  const location = useLocation();
  const isAll = location.pathname == "/allRecipes";
  const isFav = location.pathname == "/favorites";
  const { favorites, getFavorites } = useContext(Context);
  const isFavorite = () =>
    favorites.find((f) => f._id == props.id) ? true : false;

  const handleDeleteClick = () => {
    props.onDeleteCard(props.id);
  };

  const handleEditClick = () => {
    props.onEditRecipeCard(props.id);
  };

  const handleFavoriteClick = () => {
    const endPoint = isFavorite() ? "removeFavorite" : "addFavorite";
    http
      .put(`/users/${endPoint}/${props.id}`, {})
      .then((res) => {
        console.log(res);
        getFavorites();
      })
      .catch((err) => {
        if (err.response) {
          toast.error("Can't add recipe to favorite");
        }
      });
  };

  return (
    <div className="card-deck">
      <div className="card oneCard">
        <a href={`/recipeInfo/${props.id}`}>
          <img
            className="card-img-top"
            src={props.image}
            alt="Card image cap"
          />
        </a>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
        </div>
        <div className="card-btn">
          {!isFav && !isAll && (
            <button
              type="button"
              className="btn btns"
              id="deleteBtn"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          )}

          {!isFav && !isAll && (
            <button
              type="button"
              className="btn btns"
              id="editBtn"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}

          <button
            type="button"
            className="btn btns"
            id="favoriteBtn"
            onClick={handleFavoriteClick}
            style={{ backgroundColor: isFavorite() ? "red" : "gray" }}
          >
            <FontAwesomeIcon className="heartIcon" icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
