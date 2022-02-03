import { FC, FormEventHandler } from "react";
import "./signinmodalbody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "../common/inputTextContainer";

export interface SignInModalProps {
  closeModal: () => void;
  login: string;
  password: string;
  message: string;
  postFunc: FormEventHandler<HTMLFormElement>;
  loginChanged: (value: string) => void;
  passwordChanged: (value: string) => void;
  messageChanged: (value: string) => void;
  verifyPassword: (value: string) => void;
}

const SignInModalBody: FC<SignInModalProps> = ({
  closeModal,
  login,
  password,
  message,
  postFunc,
  loginChanged,
  passwordChanged,
}) => (
  <div className="signIn__modal_container">
    <div className="signIn__modal_upper-container">
      <h1 className="signIn__modal_title">Authorization</h1>
      <button className="signIn__modal_close-btn" type="button" onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
    <form action="#" className="signIn__modal_content-container" onSubmit={postFunc}>
      <span>{message}</span>
      <InputText name="Login" id="SignInLogin" type="text" onChange={loginChanged} value={login} />
      <InputText name="Password" id="SignInPassword" type="password" onChange={passwordChanged} value={password} />
      <div className="signIn__modal_submit-btn-container">
        <input className="signIn__modal_submit-btn" type="submit" />
      </div>
    </form>
  </div>
);

export default SignInModalBody;
