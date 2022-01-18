import { FC } from "react";
import { SignUpBtnProps } from "@/types/types";
import "./signupbtn.scss";

const SignUpBtn: FC<SignUpBtnProps> = ({ showModal }) => (
  <div className="signUp__container">
    <button type="button" className="signUp__btn" onClick={() => showModal()}>
      <p className="signUp__title">Sign Up</p>
      <i className="fa fa-user-plus" />
    </button>
  </div>
);

export default SignUpBtn;
