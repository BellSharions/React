import { FC } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ReducerState } from "./redux/reducer";

const ProtectedRoute: FC<RouteProps> = ({ children, location, ...routeProps }) => {
  const loggedIn = useSelector((state: ReducerState) => state.loggedIn);
  return (
    <Route
      {...routeProps}
      render={() =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location?.pathname },
            }}
          />
        )
      }
    />
  );
};
export default ProtectedRoute;
