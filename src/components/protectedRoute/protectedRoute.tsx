/* eslint-disable no-nested-ternary */
import { routesMap } from "@/constants/constants";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { showSignInModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";

const ProtectedRoute: FC<RouteProps> = ({ children, location }) => {
  const [loggedIn] = useSelector((state: ReducerState) => [state.reducer.loggedIn]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loggedIn) {
      dispatch(showSignInModalAction());
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn ? (
        location !== undefined ? (
          <Route path={location?.pathname} render={() => children} />
        ) : (
          <Route path={routesMap.HOME} render={() => children} />
        )
      ) : (
        <Redirect
          to={{
            pathname: routesMap.HOME,
            state: location?.pathname,
          }}
        />
      )}
      )
    </>
  );
};
export default ProtectedRoute;
