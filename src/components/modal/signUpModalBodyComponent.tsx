import { FC } from "react";
import "./signupmodalbody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { SignUpModalProps } from "@/types/types";
import InputText from "./inputText";
import { closeModalAction } from "../redux/actions";

const SignUpModalComponent: FC<SignUpModalProps> = ({
  dispatch,
  logup,
  password,
  message,
  putFunc,
  logupGetter,
  passwordGetter,
  repeatPassword,
  repeatPasswordGetter,
}) => (
  <div className="signUp__modal_container">
    <div className="signUp__modal_upper-container">
      <h1 className="signUp__modal_title">Registration</h1>
      <button className="signUp__modal_close-btn" type="button" onClick={() => dispatch(closeModalAction())}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
    <p>{message}</p>
    <form action="#" className="signUp__modal_content-container" onSubmit={putFunc}>
      <InputText name="Login" id="SignUplogin" type="text" onChange={logupGetter} value={logup} />
      <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordGetter} value={password} />
      <InputText
        name="Repeat Password"
        id="SignUpRepeatPassword"
        type="password"
        onChange={repeatPasswordGetter}
        value={repeatPassword}
      />
      <div className="signUp__modal_submit-btn-container">
        <input className="signUp__modal_submit-btn" type="submit" />
      </div>
    </form>
  </div>
);

export default SignUpModalComponent;
