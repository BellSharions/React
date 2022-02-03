import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component, Dispatch, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./components/footer/footer";
import Home from "./components/home/homeContainer";
import { CallType, loginKey, roleKey, RoutesMap, userCartUrl } from "./constants";
import { CartResponse, GameCart } from "./types";
import CartPage from "./components/cart/cartPageContainer";
import store from "./redux/store/store";
import { ReducerState } from "./redux/reducers/reducer";
import HeaderContainer from "./components/header/headerContainer";
import { logInAction, setRoleAction } from "./redux/actions/actions";
import ModalBodyContainer from "./components/modal/modalBodyContainer";
import { setCartGamesAction } from "./redux/actions/cartActions";
import apiCall from "./apiCall";
import ProtectedRoute from "./components/protected-route/protectedRoute";

const Profile = lazy(() => import("./components/users/profileContainer"));
const About = lazy(() => import("./components/about/about"));
const Products = lazy(() => import("./components/products/productsContainer"));

export interface AppProps {
  props: string;
}

export interface AppState {
  loggedIn?: boolean;
  userName?: string;
}

function storageGrab(key: string) {
  return localStorage.getItem(key);
}

const mapStateToProps = (state: ReducerState) => ({
  isLoading: state.reducer.isLoading,
});

const mapDispatchToProps = (
  dispatch: Dispatch<{
    type: string;
    payload: string | GameCart[];
  }>
) => ({
  getLogin: (value: string) => dispatch(logInAction(value)),
  getRole: (value: string) => dispatch(setRoleAction(value)),
  setCart: (value: GameCart[]) => dispatch(setCartGamesAction(value)),
});
class AppContainer extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    if (storageGrab(loginKey)) this.props.getLogin(storageGrab(loginKey));
    if (storageGrab(roleKey)) this.props.getRole(storageGrab(roleKey));
  }

  async componentDidMount() {
    const getResponse = await apiCall(`${userCartUrl}${store.getState().reducer.userName}`, CallType.GET, null);

    if (getResponse.status === 200) {
      this.props.setCart((getResponse.data as CartResponse).gamesList);
    }
  }

  render() {
    return (
      <StrictMode>
        <Suspense
          fallback={
            <div className="loading-icon">
              <FontAwesomeIcon icon={faSpinner} className="loading__loading-icon" />
            </div>
          }
        >
          <HeaderContainer />
          <Switch>
            <ProtectedRoute path={`${RoutesMap.PRODUCTS}/:platform`}>
              <Products />
            </ProtectedRoute>
            <ProtectedRoute path={RoutesMap.CART}>
              <CartPage />
            </ProtectedRoute>
            <ProtectedRoute path={RoutesMap.ABOUT}>
              <About />
            </ProtectedRoute>
            <ProtectedRoute path={RoutesMap.PROFILE}>
              <Profile />
            </ProtectedRoute>

            <Route path={["/", RoutesMap.HOME]} render={() => <Home />} />
          </Switch>
          <Footer />
          <ModalBodyContainer />
          {store.getState().reducer.isLoading ? (
            <div className="loading-icon">
              <FontAwesomeIcon icon={faSpinner} className="loading__loading-icon" />
            </div>
          ) : null}
        </Suspense>
      </StrictMode>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
