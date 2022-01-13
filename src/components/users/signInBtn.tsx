import { FC } from "react";
import "./signinbtn.scss";
import { useDispatch } from "react-redux";
import SignInBtnComponent from "./signInBtnComponent";

const SignInBtn: FC = () => {
  const dispatch = useDispatch();

  return <SignInBtnComponent dispatch={dispatch} />;
};

export default SignInBtn;
