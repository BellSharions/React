import { FC } from "react";
import "./signoutbtn.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logOutAction } from "../redux/actions";

const SignOutBtn: FC = () => {
  const dispatch = useDispatch();
  return (
    <div className="signOut__container">
      <button type="button" className="signOut__btn" onClick={() => dispatch(logOutAction())}>
        <FontAwesomeIcon icon={faDoorOpen} />
      </button>
    </div>
  );
};

export default SignOutBtn;
