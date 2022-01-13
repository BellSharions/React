import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";
import { showSignInModalAction } from "../redux/actions";
import { ReducerState } from "../redux/reducer";
import ProtectedRouteComponent from "./protectedRouteComponent";

const ProtectedRoute: FC<RouteProps> = ({ children, location }) => {
  const [loggedIn] = useSelector((state: ReducerState) => [state.loggedIn]);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(location);

    if (!loggedIn) {
      dispatch(showSignInModalAction());
    }
  }, [loggedIn]);
  return (
    <ProtectedRouteComponent location={location} loggedIn={loggedIn}>
      {children}
    </ProtectedRouteComponent>
  );
};
export default ProtectedRoute;
