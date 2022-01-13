import { FC } from "react";
import { SignUpBtnProps } from "@/types/types";
import "./signupbtn.scss";
import { showSignUpModalAction } from "../redux/actions";

const SignUpBtnComponent: FC<SignUpBtnProps> = ({ dispatch }) => (
  <div className="signUp__container">
    <button type="button" className="signUp__btn" onClick={() => dispatch(showSignUpModalAction())}>
      <p className="signUp__title">Sign Up</p>
      <i className="fa fa-user-plus" />
    </button>
  </div>
);

export default SignUpBtnComponent;
