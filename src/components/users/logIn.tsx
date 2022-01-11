import { useEffect } from "react";
import "./logIn.scss";
import { useLocation, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LocationState } from "../../types/types";
import { showSignInModalAction } from "../redux/actions";

const LogInPage: React.FC = () => {
  const loggedIn = useSelector((state: ReducerState) => state.loggedIn);
  const { state } = useLocation<LocationState>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn) {
      dispatch(showSignInModalAction());
    }
  }, [loggedIn]);

  return <div className="logInPage__container">{loggedIn ? <Redirect to={state?.from || "/"} /> : null}</div>;
};
export default LogInPage;
