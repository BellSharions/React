import { Link } from "react-router-dom";
import "./header.scss";
import { HOME, ABOUT, SIGNIN, SIGNUP, PRODUCTS } from "../../constants/constants";

const Header: React.FC = () => {
  const test = () => true;
  return (
    <header className="header">
      <h3 className="header__title">Game Market</h3>
      <div className="navlinks">
        <Link to={HOME} className="navlinks__link">
          Home
        </Link>
        <div className="dropdown">
          <div className="button-container">
            <input className="dropbtn" type="button" value="Products" />
            <i className="fa fa-caret-down" />
          </div>
          <div className="dropdown-content">
            <Link to={PRODUCTS} className="content__link">
              PC
            </Link>
            <Link to={PRODUCTS} className="content__link">
              XBox
            </Link>
            <Link to={PRODUCTS} className="content__link">
              PlayStation
            </Link>
          </div>
        </div>
        <Link to={ABOUT} className="navlinks__link">
          About
        </Link>
        <Link to={SIGNIN} className="navlinks__link">
          Sign-in
        </Link>
        <Link to={SIGNUP} className="navlinks__link">
          Sign-up
        </Link>
      </div>
    </header>
  );
};

export default Header;
