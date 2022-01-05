import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { ProtectedParams } from "../types/types";

const ProtectedRoute: FC<ProtectedParams> = ({ loggedIn, children, path, ...routeProps }) => (
  <Route
    {...routeProps}
    render={() =>
      loggedIn ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: path },
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
