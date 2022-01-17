import { FC } from "react";
import { SignInBtnProps } from "@/types/types";
import "./signinbtn.scss";

const SignInBtn: FC<SignInBtnProps> = ({ showModal }) => (
  <div className="signIn__container">
    <button type="button" className="signIn__btn" onClick={() => showModal()}>
      <p className="signIn__title">Sign In</p>
      <i className="fa fa-sign-in-alt" />
    </button>
  </div>
);

export default SignInBtn;
