import "./AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="row divAbout">
        <div className="col aboutTitle">
          <h1 className="col aboutHeader">Digital recipes book</h1>
          <h2 className="col aboutSmallHeader">
            Cooking is not just a stir in a pot. Baking is not just a knead
            dough. <br />
            Making a meal is art, your art.
            <br /> Gather all your recipes and food photos for a unique, useful
            and beautiful book.
          </h2>
        </div>
      </div>

      <div className="row divAbout">
        <div className="col aboutTitle2">
          <h2 className="col aboutHeader2">All you need to do...</h2>
          <h3 className="col aboutSmallHeader2">
            Signup to the app and start adding recieps to your digital book.
            <br />
            Add photos of your meals, the Ingredients you need and the cooking
            instructions.
            <br /> You can even mark recipes as FAVORITE in someone else's book.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
