import { FC, useEffect, useState } from "react";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { ModalTypes, Roles } from "@/constants";
import { showModalAction } from "@/redux/actions/modalActions";
import { ReducerState } from "@/redux/store/store";
import Header from "./header";
import { logOutAction } from "../../redux/actions/actions";

const HeaderContainer: FC = () => {
  const [name, loggedIn] = useSelector((state: ReducerState) => [state.reducer.userName, state.reducer.loggedIn]);
  const dispatch = useDispatch();
  const cartNum: number = useSelector((state: ReducerState) => state.cart.gamesList?.length);
  const role = useSelector((state: ReducerState) => state.reducer.role);
  const [visible, setVisible] = useState<boolean>(false);
  const showSignInModal = () => {
    dispatch(showModalAction(ModalTypes.SIGNIN));
  };
  const addAction = () => {
    dispatch(showModalAction(ModalTypes.ADDGAME));
  };
  const showSignUpModal = () => {
    dispatch(showModalAction(ModalTypes.SIGNUP));
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
