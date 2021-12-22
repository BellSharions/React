import { FC } from "react";
import "./signinbtn.scss";
import Modal from "../modal/modal";
import SignInModalBody from "../modal/signInModalBody";
import { SignInBtnProps } from "../../types/types";

const SignInBtn: FC<SignInBtnProps> = ({ logInFunc, showSignInModalFunc, closeModalFunc, showSignInModal }) => {
  const showModalHandler = () => {
    showSignInModalFunc();
  };

  const closeModalHandler = () => {
    closeModalFunc();
  };

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={showModalHandler}>
        <p className="signIn__title">Sign In</p>
      </button>
      {showSignInModal ? (
        <Modal>
          <SignInModalBody logInFunc={logInFunc} closeModalFunc={closeModalHandler} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignInBtn;
