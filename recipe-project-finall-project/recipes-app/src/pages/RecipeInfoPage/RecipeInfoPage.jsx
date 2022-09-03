import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import http from "../../api/http";

import "./RecipeInfoPage.css";

const CardInfoPage = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [ingredients, setingredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    http
      .get(`/recipes/recipe/${id}`)
      .then((res) => {
        console.log("res:", res.data);
        setName(res.data.name);
        setingredients(res.data.ingredients.split("\n"));
        setInstructions(res.data.instructions.split("\n"));
        setImage(res.data.image);
      })
      .catch((err) => console.log("err:", err));
  }, []);

  return (
    <div className="recipeInfoContainer">
      <h1 className="recipeInfoHeader">{name}</h1>
      <img className="recipeInfoImg" src={image} alt="" />
      <h3 className="ingredientsHeader"> Ingredients</h3>
      <h5 className="ingredients">
        <ul>
          {ingredients.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      </h5>
      <h3 className="ingredientsHeader"> Instructions</h3>
      <h5 className="instructions">
        <ul>
          {instructions.map((i, idx) => (
            <li key={idx} className="instructionsUl">
              {i}
            </li>
          ))}
        </ul>
      </h5>
    </div>
  );
};

export default CardInfoPage;
