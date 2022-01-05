import { FC } from "react";
import "./signoutbtn.scss";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { SignOutBtnProps } from "../../types/types";

const SignOutBtn: FC<SignOutBtnProps> = ({ logOutFunc }) => {
  const history = useHistory();
  const handleCkick = () => {
    logOutFunc();
    history.push("/");
  };
  return (
    <div className="signOut__container">
      <button type="button" className="signOut__btn" onClick={handleCkick}>
        <FontAwesomeIcon icon={faDoorOpen} />
      </button>
    </div>
  );
};

export default SignOutBtn;
