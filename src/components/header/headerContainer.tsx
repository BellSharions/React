import { FC, useEffect, useState } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Roles } from "@/constants";
import Header from "./header";
import { logOutAction, showAddGameModalAction, showSignInModalAction, showSignUpModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";

const HeaderContainer: FC = () => {
  const [name, loggedIn] = useSelector((state: ReducerState) => [state.reducer.userName, state.reducer.loggedIn]);
  const dispatch = useDispatch();
  const cartNum: number = useSelector((state: ReducerState) => state.cart.gamesList.length);
  const role = useSelector((state: ReducerState) => state.reducer.role);
  const [visible, setVisible] = useState<boolean>(false);
  const showSignInModal = () => {
    dispatch(showSignInModalAction());
  };
  const addAction = () => {
    dispatch(showAddGameModalAction());
  };
  const showSignUpModal = () => {
    dispatch(showSignUpModalAction());
  };
  const logOut = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("role");
    dispatch(logOutAction());
  };
  useEffect(() => {
    if (role === Roles.ADMIN) setVisible(true);
  }, [role]);
  return (
    <Header
      userName={name}
      loggedIn={loggedIn}
      showSignInModal={showSignInModal}
      showSignUpModal={showSignUpModal}
      logOut={logOut}
      cartNum={cartNum}
      addAction={addAction}
      visible={visible}
    />
  );
};

export default HeaderContainer;
