import { useState } from "react";
import "./RecipeCardEditComponenet.css";

const RecipeEdit = (props) => {
  const [name, setName] = useState(props.name);
  const [ingredients, setIngredients] = useState(props.ingredients);
  const [instructions, setInstructions] = useState(props.instructions);
  const [image, setImage] = useState(props.image);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeIngredients = (event) => {
    setIngredients(event.target.value);
  };
  const handleChangeInstructions = (event) => {
    setInstructions(event.target.value);
  };

  const handleChangeImage = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdateRecipeCard(name, ingredients, instructions, image, props.id);
  };

  return (
    <form className="popup-wrapper" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="updateLabel" htmlFor="exampleInputEmail1">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={name}
          onChange={handleChangeName}
        />
      </div>
      <div className="form-group">
        <label className="updateLabel" htmlFor="exampleInputEmail1">
          Ingredients:
        </label>
        <textarea
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={ingredients}
          rows="4"
          onChange={handleChangeIngredients}
        />
      </div>
      <div className="form-group">
        <label className="updateLabel" htmlFor="exampleInputEmail1">
          Instructions:
        </label>
        <textarea
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={instructions}
          rows="4"
          onChange={handleChangeInstructions}
        />
      </div>
      <div className="form-group">
        <label className="updateLabel" htmlFor="exampleInputImage1">
          Image:
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputImage1"
          value={image}
          onChange={handleChangeImage}
        />
      </div>

      <br />

      <button type="submit" className="btn updateBtn">
        Update
      </button>
    </form>
  );
};

export default RecipeEdit;
