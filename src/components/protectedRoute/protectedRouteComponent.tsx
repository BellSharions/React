import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRouteComponent: FC<RouteProps> = ({ children, location, loggedIn }) => (
  <>
    {loggedIn ? (
      <Route path={location?.pathname} render={() => children} />
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
export default ProtectedRouteComponent;
