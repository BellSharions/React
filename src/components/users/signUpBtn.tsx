import { FC } from "react";
import "./signupbtn.scss";
import { useDispatch } from "react-redux";
import { showSignUpModalAction } from "../redux/actions";

const SignUpBtn: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="signUp__container">
      <button type="button" className="signUp__btn" onClick={() => dispatch(showSignUpModalAction())}>
        <p className="signUp__title">Sign Up</p>
        <i className="fa fa-user-plus" />
      </button>
    </div>
  );
};

export default SignUpBtn;
