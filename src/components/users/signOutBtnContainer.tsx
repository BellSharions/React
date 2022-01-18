import { FC } from "react";
import "./signoutbtn.scss";
import { useDispatch } from "react-redux";
import SignOutBtn from "./signOutBtn";
import { logOutAction } from "../redux/actions";

const SignOutBtnContainer: FC = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutAction());
  };
  return <SignOutBtn logOut={logOut} />;
};

export default SignOutBtnContainer;
