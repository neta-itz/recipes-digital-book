import { Switch, Route, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";

import "react-toastify/dist/ReactToastify.css";
import http from "./api/http";
import jwt_decode from "jwt-decode";

import Footer from "./components/FooterComponent/FooterComponent";
import NavBarComponent from "./components/NavBarComponent/NavbarComponent";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import FoodPanelPage from "./pages/FoodPanelPage/FoodPanelPage";
import NewRecipePage from "./pages/CreateNewRecipePage/CreateNewRecipePage";
import CardInfoPage from "./pages/RecipeInfoPage/RecipeInfoPage";
import AllRecipesPage from "./pages/AllRecipesPage/AllRecipesPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import NewPasswordPage from "./pages/NewPasswordPage/NewPasswordPage";
import Logout from "./components/Logout";
import AuthGuardRoute from "./components/AuthGuardRoute";
import Context from "./context";

import "./App.css";
import SignUpPage from "./pages/SignupPage/SignupPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isCheck, setIsCheck] = useState(true);

  //for redux actions
  const dispatch = useDispatch();

  const getUser = () => {
    if (!localStorage.getItem("tokenKey")) return setIsCheck(false);
    http
      .get("/users/userInfo")
      .then((dataFromServer) => {
        setIsAuth(true);
        dispatch(authActions.login());
        const decoded = jwt_decode(localStorage.getItem("tokenKey"));
        dispatch(authActions.updateUser(decoded));
      })
      .catch((err) => {
        setIsAuth(false);
        localStorage.clear();
        dispatch(authActions.logout());
      })
      .finally(() => {
        setIsCheck(false);
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  /* favorites */
  const [favorites, setFavorites] = useState([]);
  const getFavorites = () => {
    if (!isAuth) return;
    http
      .get("/users/favorites")
      .then((dataFromServer) => {
        setFavorites(dataFromServer.data.favorites);
      })
      .catch((err) => {
        if (err.response) {
          toast.error("No cards to show");
        }
      });
  };
  useEffect(() => {
    if (!isAuth) return;
    getFavorites();
  }, [isAuth]);
  /* end favorites */

  if (isCheck) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status"></div>
      </div>
    );
  }

  return (
    <Context.Provider value={{ favorites, getFavorites, isAuth, setIsAuth }}>
      <div className="container">
        <NavBarComponent></NavBarComponent>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>

          <Route path="/home" component={HomePage} />

          <Route path="/about" component={AboutPage} />

          <Route path="/signup" component={SignUpPage} />

          <Route path="/login" component={LoginPage} />

          <Route path="/newPassword" component={NewPasswordPage} />

          <AuthGuardRoute path="/foodPanel" component={FoodPanelPage} />

          <Route path="/newRecipe" component={NewRecipePage} />

          <Route path="/recipeInfo/:id" component={CardInfoPage} />

          <AuthGuardRoute path="/allRecipes" component={AllRecipesPage} />

          <AuthGuardRoute path="/favorites" component={FavoritePage} />

          <Route path={"/home"} component={Logout} />
        </Switch>
        <Footer></Footer>
      </div>
    </Context.Provider>
  );
}

export default App;
