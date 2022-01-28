import { FC } from "react";
import "./passwordModalBody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { PasswordModalProps } from "@/types/types";
import InputTextContainer from "@/elements/inputTextContainer";

const ChangePassModalBody: FC<PasswordModalProps> = ({
  closeModal,
  changeFunc,
  passwordGetter,
  newPassword,
  passMessage,
  repeatPasswordGetter,
  repeatNewPassword,
  repeatPassMessage,
  formValid,
}) => (
  <div className="changePass__modal_container">
    <div className="changePass__modal_upper-container">
      <h1 className="changePass__modal_title">Change password</h1>
      <button className="changePass__modal_close-btn" type="button" onClick={closeModal}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
    <form action="#" className="changePass__modal_content-container" onSubmit={changeFunc}>
      <InputTextContainer
        name="Password"
        id="SignUpPassword"
        type="password"
        onChange={passwordGetter}
        value={newPassword}
      />
      <p>{passMessage}</p>
      <br />
      <InputTextContainer
        name="Repeat password"
        id="SignUpRepeatPassword"
        type="password"
        onChange={repeatPasswordGetter}
        value={repeatNewPassword}
      />
      <p>{repeatPassMessage}</p>
      <br />
      <div className="changePass__modal_submit-btn-container">
        <input className="changePass__modal_submit-btn" type="submit" disabled={!formValid} />
      </div>
    </form>
  </div>
);

export default ChangePassModalBody;
