import { NavLink } from "react-router-dom";
import { FC } from "react";
import { HeaderProps } from "@/types/types";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {
  logOutText,
  multiLink,
  routes,
  routesMap,
  routeType,
  signInText,
  signUpText,
  singleLink,
} from "../../constants/constants";
import Dropdown from "./navbarDropdown/dropdown";
import BtnContainer from "../../elements/buttonContainer";

const Header: FC<HeaderProps> = ({ userName, loggedIn, showSignInModal, showSignUpModal, logOut, cartNum }) => (
  <header className="header">
    <h3 className="header__title">Game Market</h3>
    <div className="header__navlinks">
      {routes.map((object: singleLink | multiLink) => (
        <>
          {object.type === routeType.link && (
            <NavLink className="header__navlinks-link" key={object.item.name} to={(object as singleLink).item.route}>
              <span className="navtext">{(object as singleLink).item.name}</span>
              <i className={(object as singleLink).item.icon} />
            </NavLink>
          )}
          {object.type === routeType.dropdown && (
            <Dropdown
              key={object.item.name}
              name={(object as multiLink).item.name}
              subLinks={(object as multiLink).item.data}
            />
          )}
        </>
      ))}
      {loggedIn ? (
        <>
          <NavLink
            key={routesMap.CART}
            exact
            to={routesMap.CART}
            className="header__btn_cart"
            activeClassName="header__btn_cart-active"
            role="button"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="header__btn-title" />
            <p className="header__btn-title">{cartNum}</p>
          </NavLink>
          <NavLink className="header__navlinks-link" to={routesMap.PROFILE}>
            <span className="navtext">{userName}</span>
          </NavLink>
          <BtnContainer action={logOut} childrenProps={logOutText} />
        </>
      ) : (
        <>
          <BtnContainer action={showSignInModal} childrenProps={signInText} />
          <BtnContainer action={showSignUpModal} childrenProps={signUpText} />
        </>
      )}
    </div>
  </header>
);

export default Header;
