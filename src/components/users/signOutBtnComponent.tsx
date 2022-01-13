import { FC } from "react";
import "./signoutbtn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { SignOutBtnProps } from "@/types/types";
import { logOutAction } from "../redux/actions";

const SignOutBtnComponent: FC<SignOutBtnProps> = ({ dispatch }) => (
  <div className="signOut__container">
    <button type="button" className="signOut__btn" onClick={() => dispatch(logOutAction())}>
      <FontAwesomeIcon icon={faDoorOpen} />
    </button>
  </div>
);

export default SignOutBtnComponent;
