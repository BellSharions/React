/* eslint-disable no-nested-ternary */
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { showSignInModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";

const ProtectedRoute: FC<RouteProps> = ({ children, location }) => {
  const [loggedIn] = useSelector((state: ReducerState) => [state.loggedIn]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("login")) {
      dispatch(showSignInModalAction());
    }
  }, [localStorage.getItem("login")]);

  return (
    <>
      {localStorage.getItem("login") ? (
        location !== undefined ? (
          <Route path={location?.pathname} render={() => children} />
        ) : (
          <Route path="/home" render={() => children} />
        )
      ) : (
        <Redirect
          to={{
            pathname: "/home",
            state: location?.pathname,
          }}
        />
      )}
      )
    </>
  );
};
export default ProtectedRoute;
