import { FC } from "react";
import "./signinbtn.scss";
import { useDispatch } from "react-redux";
import { showSignInModalAction } from "../redux/actions";

const SignInBtn: FC = () => {
  const dispatch = useDispatch();

  return (
    <div className="signIn__container">
      <button type="button" className="signIn__btn" onClick={() => dispatch(showSignInModalAction())}>
        <p className="signIn__title">Sign In</p>
        <i className="fa fa-sign-in-alt" />
      </button>
    </div>
  );
};

export default SignInBtn;
