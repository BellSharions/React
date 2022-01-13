import { FC } from "react";
import "./signupbtn.scss";
import { useDispatch } from "react-redux";
import SignUpBtnComponent from "./signupBtnComponent";

const SignUpBtn: FC = () => {
  const dispatch = useDispatch();

  return <SignUpBtnComponent dispatch={dispatch} />;
};

export default SignUpBtn;
