import { FC } from "react";
import "./signinbtn.scss";
import { useDispatch } from "react-redux";
import SignInBtn from "./signInBtn";
import { showSignInModalAction } from "../redux/actions";

const SignInBtnContainer: FC = () => {
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(showSignInModalAction());
  };

  return <SignInBtn showModal={showModal} />;
};

export default SignInBtnContainer;
