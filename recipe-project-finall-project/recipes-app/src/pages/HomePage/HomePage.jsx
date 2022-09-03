import homePic from "../../assets/indian-food.jpg";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container home-container">
      <div className="row rowHome">
        <div className="col homeTitle">
          <h1 className="col homeHeader">Digital recipes book</h1>
          <h2 className="col homeSmallHeader">
            So that your culinary creations will be remembered.
          </h2>
        </div>
        <img className="col homeImg" src={homePic} alt="home" />
      </div>
    </div>
  );
};

export default HomePage;
