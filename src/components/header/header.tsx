import { NavLink } from "react-router-dom";
import "./header.scss";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { multiLink, routes, routeType, singleLink } from "../../constants/constants";
import Dropdown from "./navbarDropdown/dropdown";
import SignOutBtn from "../users/signOutBtn";
import SignInBtn from "../users/signInBtn";
import SignUpBtn from "../users/signUpBtn";
import { HeaderProps } from "../../types/types";
import UserName from "../users/userName";
import { logInAction, logOutAction } from "../redux/actions";

const Header: React.FC<HeaderProps> = ({ loggedIn, userName, dispatchedLogInAction, dispatchedLogOutAction }) => (
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
          <SignOutBtn dispatchedLogOutAction={dispatchedLogOutAction} />
        </>
      ) : (
        <>
          <SignInBtn dispatchedLogInAction={dispatchedLogInAction} />
          <SignUpBtn dispatchedLogInAction={dispatchedLogInAction} />
        </>
      )}
    </div>
  </header>
);

const mapStateToProps = (state: { loggedIn: boolean; userName: string }) => ({
  loggedIn: state.loggedIn,
  userName: state.userName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchedLogInAction: (userName: string) => dispatch(logInAction(userName)),
  dispatchedLogOutAction: () => dispatch(logOutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
