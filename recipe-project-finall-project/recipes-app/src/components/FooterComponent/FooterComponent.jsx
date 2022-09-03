import "./FooterComponent.css";

const Footer = () => {
  return (
    <div className="footer">
      <footer className="bg-light text-center text-lg-start">
        <div className="copyright text-center p-3">
          Email: RecipesBook@gmail.com <br />
          Phone: +972-501234123 <br />
          <p>© 2022 Copyright : Neta Itzkovich</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
