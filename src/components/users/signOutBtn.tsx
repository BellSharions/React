import { FC } from "react";
import "./signoutbtn.scss";
import { useDispatch } from "react-redux";
import SignOutBtnComponent from "./signOutBtnComponent";

const SignOutBtn: FC = () => {
  const dispatch = useDispatch();
  return <SignOutBtnComponent dispatch={dispatch} />;
};

export default SignOutBtn;
