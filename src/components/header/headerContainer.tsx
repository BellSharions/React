import { FC, useEffect } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import { logInAction, logOutAction, showSignInModalAction, showSignUpModalAction } from "../redux/actions";

const HeaderContainer: FC = () => {
  const [name, loggedIn] = useSelector((state) => [state.userName, state.loggedIn]);
  const dispatch = useDispatch();
  const showSignInModal = () => {
    dispatch(showSignInModalAction());
  };
  const showSignUpModal = () => {
    dispatch(showSignUpModalAction());
  };
  const logOut = () => {
    localStorage.removeItem("login");
    dispatch(logOutAction());
  };
  useEffect(() => {
    if (localStorage && localStorage.getItem("login")) dispatch(logInAction(localStorage.getItem("login")));
  }, [localStorage.getItem("login")]);
  return (
    <Header
      userName={name}
      loggedIn={loggedIn}
      showSignInModal={showSignInModal}
      showSignUpModal={showSignUpModal}
      logOut={logOut}
    />
  );
};

export default HeaderContainer;
