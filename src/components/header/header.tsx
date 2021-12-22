import { NavLink } from "react-router-dom";
import "./header.scss";
import { multiLink, routes, routeType, singleLink } from "../../constants/constants";
import Dropdown from "./navbarDropdown/dropdown";
import { LoggedInConsumer, UserNameConsumer } from "../../context";
import SignOutBtn from "../users/signOutBtn";
import SignInBtn from "../users/signInBtn";
import SignUpBtn from "../users/signUpBtn";
import { HeaderProps } from "../../types/types";
import UserName from "../users/userName";

const Header: React.FC<HeaderProps> = ({
  showSignInModal,
  showSignUpModal,
  logInFunc,
  logOutFunc,
  showSignInModalFunc,
  showSignUpModalFunc,
  closeModalFunc,
}) => (
  <header className="header">
    <h3 className="header__title">Game Market</h3>
    <div className="header__navlinks">
      {routes.map((object: singleLink | multiLink) => (
        <>
          {object.type === routeType.link && (
            <NavLink className="header__navlinks-link" key={object.item.name} to={(object as singleLink).item.route}>
              {(object as singleLink).item.name}
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
      <LoggedInConsumer>
        {(contextLogInState) => {
          if (contextLogInState) {
            return (
              <>
                <UserNameConsumer>{(contextUserName) => <UserName userName={contextUserName} />}</UserNameConsumer>
                <SignOutBtn logOutFunc={logOutFunc} />
              </>
            );
          }
          return (
            <>
              <SignInBtn
                logInFunc={logInFunc}
                showSignInModalFunc={showSignInModalFunc}
                closeModalFunc={closeModalFunc}
                showSignInModal={showSignInModal}
              />
              <SignUpBtn
                logInFunc={logInFunc}
                showSignUpModalFunc={showSignUpModalFunc}
                closeModalFunc={closeModalFunc}
                showSignUpModal={showSignUpModal}
              />
            </>
          );
        }}
      </LoggedInConsumer>
    </div>
  </header>
);

export default Header;
