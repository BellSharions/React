import { NavLink } from "react-router-dom";
import { FC } from "react";
import { HeaderProps } from "@/types/types";
import "./header.scss";
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
import BtnContainer from "../users/buttonContainer";

const Header: FC<HeaderProps> = ({ userName, loggedIn, showSignInModal, showSignUpModal, logOut }) => (
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
