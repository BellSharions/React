import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { showSignInModalAction } from "./redux/actions";
import { ReducerState } from "./redux/reducer";

const ProtectedRoute: FC<RouteProps> = ({ children, location, ...routeProps }) => {
  const [loggedIn, signInModalVisible] = useSelector((state: ReducerState) => [
    state.loggedIn,
    state.signInModalVisible,
  ]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(location);

    if (!loggedIn) {
      dispatch(showSignInModalAction());
    }
  }, [loggedIn]);
  return (
    <>
      {loggedIn ? (
        <Route path={location?.pathname} render={() => children} />
      ) : (
        <Redirect
          to={{
            pathname: "/home",
            state: routeProps.path,
          }}
        />
      )}
      )
    </>
  );
};
export default ProtectedRoute;
