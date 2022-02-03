/* eslint-disable no-nested-ternary */
import { ModalTypes, RoutesMap } from "@/constants";
import { showModalAction } from "@/redux/actions/modalActions";
import { ReducerState } from "@/redux/store/store";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: FC<RouteProps> = ({ children, location }) => {
  const [loggedIn] = useSelector((state: ReducerState) => [state.reducer.loggedIn]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loggedIn) {
      dispatch(showModalAction(ModalTypes.SIGNIN));
    }
  }, [loggedIn]);

  return (
    <>
      {loggedIn ? (
        location !== undefined ? (
          <Route path={location?.pathname} render={() => children} />
        ) : (
          <Route path={RoutesMap.HOME} render={() => children} />
        )
      ) : (
        <Redirect
          to={{
            pathname: RoutesMap.HOME,
            state: location?.pathname,
          }}
        />
      )}
      )
    </>
  );
};
export default ProtectedRoute;
