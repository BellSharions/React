/* eslint-disable no-lone-blocks */
import { NavLink } from "react-router-dom";
import { FC } from "react";
import { multiLink, singleLink } from "@/types";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { routes, RoutesMap, RouteType } from "@/constants";
import BtnContainer from "../../elements/buttonContainer";
import Dropdown from "./navbar-dropdown/dropdown";

export interface HeaderProps {
  userName?: string;
  loggedIn?: boolean;
  showSignInModal: () => void;
  showSignUpModal: () => void;
  logOut: () => void;
  cartNum?: number;
  visible: boolean;
  addAction: () => void;
}

const Header: FC<HeaderProps> = ({
  userName,
  loggedIn,
  showSignInModal,
  showSignUpModal,
  logOut,
  cartNum,
  visible,
  addAction,
}) => (
  <header className="header">
    <NavLink className="header__title" to={RoutesMap.HOME}>
      <span className="navtext">Game Market</span>
    </NavLink>
    <div className="header__navlinks">
      {routes.map((object: singleLink | multiLink) => {
        if (object.type === RouteType.link)
          return (
            <NavLink className="header__navlinks-link" key={object.item.name} to={(object as singleLink).item.route}>
              <span className="navtext">{(object as singleLink).item.name}</span>
              <i className={(object as singleLink).item.icon} />
            </NavLink>
          );
        if (object.type === RouteType.dropdown)
          return (
            <Dropdown
              key={object.item.name}
              name={(object as multiLink).item.name}
              subLinks={(object as multiLink).item.data}
            />
          );
        return null;
      })}
      {loggedIn ? (
        <>
          {visible ? <BtnContainer action={addAction} childrenProps={{ label: "Add Game" }} /> : null}
          <NavLink
            key={RoutesMap.CART}
            exact
            to={RoutesMap.CART}
            className="header__btn_cart"
            activeClassName="header__btn_cart-active"
            role="button"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="header__btn-title" />
            <p className="header__btn-title">{cartNum}</p>
          </NavLink>
          <NavLink className="header__navlinks-link" to={RoutesMap.PROFILE}>
            <span className="navtext">{userName}</span>
          </NavLink>
          <BtnContainer action={logOut} childrenProps={{ label: "", icon: "fas fa-door-open" }} />
        </>
      ) : (
        <>
          <BtnContainer action={showSignInModal} childrenProps={{ label: "Sign In", icon: "fa fa-sign-in-alt" }} />
          <BtnContainer action={showSignUpModal} childrenProps={{ label: "Sign Up", icon: "fa fa-user-plus" }} />
        </>
      )}
    </div>
  </header>
);

export default Header;
