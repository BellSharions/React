import { FC } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header";
import { logOutAction, showSignInModalAction, showSignUpModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";

const HeaderContainer: FC = () => {
  const [name, loggedIn] = useSelector((state: ReducerState) => [state.reducer.userName, state.reducer.loggedIn]);
  const dispatch = useDispatch();
  const cartNum: number = useSelector((state: ReducerState) => state.cart.gamesList.length);
  const showSignInModal = () => {
    dispatch(showSignInModalAction());
  };
  const showSignUpModal = () => {
    dispatch(showSignUpModalAction());
  };
  const logOut = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    dispatch(logOutAction());
  };
  return (
    <Header
      userName={name}
      loggedIn={loggedIn}
      showSignInModal={showSignInModal}
      showSignUpModal={showSignUpModal}
      logOut={logOut}
      cartNum={cartNum}
    />
  );
};

export default HeaderContainer;
