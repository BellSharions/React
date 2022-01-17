import { FC } from "react";
import "./signoutbtn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { SignOutBtnProps } from "@/types/types";

const SignOutBtn: FC<SignOutBtnProps> = ({ logOut }) => (
  <div className="signOut__container">
    <button type="button" className="signOut__btn" onClick={() => logOut()}>
      <FontAwesomeIcon icon={faDoorOpen} />
    </button>
  </div>
);

export default SignOutBtn;
