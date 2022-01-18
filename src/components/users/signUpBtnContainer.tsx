import { FC } from "react";
import "./signupbtn.scss";
import { useDispatch } from "react-redux";
import SignUpBtn from "./signupBtn";
import { showSignUpModalAction } from "../redux/actions";

const SignUpBtnContainer: FC = () => {
  const dispatch = useDispatch();
  const showModal = () => {
    dispatch(showSignUpModalAction());
  };
  return <SignUpBtn showModal={showModal} />;
};

export default SignUpBtnContainer;
