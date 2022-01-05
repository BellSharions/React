import { FC } from "react";
import "./signupbtn.scss";
import { useHistory } from "react-router-dom";
import Modal from "../modal/modal";
import { SignUpBtnProps } from "../../types/types";
import SignUpModalBody from "../modal/signUpModalBody";

const SignUpBtn: FC<SignUpBtnProps> = ({ logInFunc, showSignUpModalFunc, closeModalFunc, showSignUpModal }) => {
  const history = useHistory();

  const showModalHandler = () => {
    showSignUpModalFunc();
  };

  const closeModalHandler = () => {
    closeModalFunc();
    history.push("/");
  };

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={showModalHandler}>
        <p className="signUp__title">Sign Up</p>
        <i className="fa fa-user-plus"></i>
      </button>
      {showSignUpModal ? (
        <Modal>
          <SignUpModalBody logInFunc={logInFunc} closeModalFunc={closeModalHandler} />
        </Modal>
      ) : null}
    </div>
  );
};

export default SignUpBtn;
