import { NavLink } from "react-router-dom";
import { FC } from "react";
import { HeaderProps } from "@/types/types";
import "./header.scss";
import { multiLink, routes, routeType, singleLink } from "../../constants/constants";
import Dropdown from "./navbarDropdown/dropdown";
import SignOutBtn from "../users/signOutBtn";
import SignInBtn from "../users/signInBtn";
import SignUpBtn from "../users/signUpBtn";
import UserName from "../users/userName";

const HeaderComponent: FC<HeaderProps> = ({ userName, loggedIn }) => (
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
          <UserName userName={userName} />
          <SignOutBtn />
        </>
      ) : (
        <>
          <SignInBtn />
          <SignUpBtn />
        </>
      )}
    </div>
  </header>
);

export default HeaderComponent;
