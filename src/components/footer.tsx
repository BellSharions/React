import "./footer.scss";

const Footer: React.FC = () => (
  <footer className="footer">
    <p className="footer__text">Super best shop ever.</p>
    <div className="icons">
      <a href="https://www.ea.com">
        <img
          className="icons__icon"
          src="https://res.cloudinary.com/dev3afzlt/image/upload/v1637339130/EA_ceinen.png"
          alt="Sorry, resource was not loaded!"
        />
      </a>
      <a href="https://www.activision.com/">
        <img
          className="icons__icon"
          src="https://res.cloudinary.com/dev3afzlt/image/upload/v1637339129/Activision_tbjzka.png"
          alt="Sorry, resource was not loaded!"
        />
      </a>
      <a href="https://www.nintendo.com/">
        <img
          className="icons__icon"
          src="https://res.cloudinary.com/dev3afzlt/image/upload/v1637339132/Nintendo_hguy1u.png"
          alt="Sorry, resource was not loaded!"
        />
      </a>
    </div>
  </footer>
);

export default Footer;
