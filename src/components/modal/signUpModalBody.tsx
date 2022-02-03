import { FC } from "react";
import "./signupmodalbody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "@/elements/inputTextContainer";

export interface SignUpModalProps {
  closeModal: () => void;
  logup: string;
  password: string;
  repeatPassword: string;
  message: string;
  putFunc: (e: SyntheticEvent<Element, Event>) => Promise<unknown>;
  logupChanged: (value: string) => void;
  passwordChanged: (value: string) => void;
  verifyPassword: (value: string) => void;
  repeatPasswordChanged: (value: string) => void;
}

const SignUpModal: FC<SignUpModalProps> = ({
  closeModal,
  logup,
  password,
  message,
  putFunc,
  logupChanged,
  passwordChanged,
  repeatPassword,
  repeatPasswordChanged,
}) => (
  <div className="signUp__modal_container">
    <div className="signUp__modal_upper-container">
      <h1 className="signUp__modal_title">Registration</h1>
      <button className="signUp__modal_close-btn" type="button" onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
    <p>{message}</p>
    <form action="#" className="signUp__modal_content-container" onSubmit={putFunc}>
      <InputText name="Login" id="SignUplogin" type="text" onChange={logupChanged} value={logup} />
      <InputText name="Password" id="SignUpPassword" type="password" onChange={passwordChanged} value={password} />
      <InputText
        name="Repeat Password"
        id="SignUpRepeatPassword"
        type="password"
        onChange={repeatPasswordChanged}
        value={repeatPassword}
      />
      <div className="signUp__modal_submit-btn-container">
        <input className="signUp__modal_submit-btn" type="submit" />
      </div>
    </form>
  </div>
);

export default SignUpModal;
