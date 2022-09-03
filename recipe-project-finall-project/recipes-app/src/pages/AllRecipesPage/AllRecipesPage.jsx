import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import http from "../../api/http";
import RecipeCard from "../../components/RecipeCardComponenet/RecipeCardComponenet";
import "./AllRecipesPage.css";

let data;

const AllRecipesPage = () => {
  const [search, setSearch] = useState("");
  const [recipesArr, setRecipesArr] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    http
      .get("/recipes/allRecipes")
      .then((dataFromServer) => {
        setRecipesArr(dataFromServer.data);
        data = dataFromServer.data;
      })
      .catch((err) => {
        if (err.response) {
          toast.error("No cards to show");
        }
      });
  }, []);

  useEffect(() => {
    if (recipesArr.length > 0) {
      setLoaded(true);
    }
  }, [recipesArr]);

  const handleSearch = () => {
    if (search == "" || !search) return setRecipesArr(data);
    setRecipesArr((old) => old.filter((r) => r.name.includes(search)));
  };

  return (
    <Fragment>
      <div className="foodPanelBgc">
        <div className="foodPanelHeaderAndBtn">
          <form className="d-flex searchForm" role="search">
            <input
              className="form-control me-2 searchInput"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="btn btn-success searchBtn"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </form>
          <h1 className="allFoodPanelHeader">All Food Recipes</h1>
        </div>
        <div className="row row-cols-2 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 card-row">
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
              ></RecipeCard>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default AllRecipesPage;
