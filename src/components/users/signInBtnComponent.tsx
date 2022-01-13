import { FC } from "react";
import { SignInBtnProps } from "@/types/types";
import "./signinbtn.scss";
import { showSignInModalAction } from "../redux/actions";

const SignInBtnComponent: FC<SignInBtnProps> = ({ dispatch }) => (
  <div className="signIn__container">
    <button type="button" className="signIn__btn" onClick={() => dispatch(showSignInModalAction())}>
      <p className="signIn__title">Sign In</p>
      <i className="fa fa-sign-in-alt" />
    </button>
  </div>
);

export default SignInBtnComponent;
