import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component, Dispatch, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./components/footer/footer";
import Home from "./components/home/homeContainer";
import { routesMap } from "./constants/constants";
import { AppProps, AppState, GameCart } from "./types/types";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import CartPage from "./components/cart/cartPageContainer";
import store from "./components/redux/store";
import { ReducerState } from "./components/redux/reducer";
import HeaderContainer from "./components/header/headerContainer";
import { logInAction, setRoleAction } from "./components/redux/actions";
import ModalBodyContainer from "./components/modal/modalBodyContainer";
import { setCartGamesAction } from "./components/redux/cart/cartActions";

const Profile = lazy(() => import("./components/users/profileContainer"));
const About = lazy(() => import("./components/about/about"));
const Products = lazy(() => import("./components/products/productsContainer"));
const mapStateToProps = (state: ReducerState) => ({
  signInModalVisible: state.reducer.signInModalVisible,
  signUpModalVisible: state.reducer.signUpModalVisible,
  buyModalVisible: state.reducer.buyModalVisible,
  changePassModalVisible: state.reducer.changePassModalVisible,
  userName: state.reducer.userName,
  loggedIn: state.reducer.loggedIn,
  age: state.reducer.age,
  sort: state.reducer.sort,
  sortDir: state.reducer.sortDir,
  genre: state.reducer.genre,
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
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    if (localStorage && localStorage.getItem("login")) this.props.getLogin(localStorage.getItem("login"));
    if (localStorage && localStorage.getItem("role")) this.props.getRole(localStorage.getItem("role"));
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  async componentDidMount() {
    const getResponse = await (
      await fetch(`http://localhost:8080/api/user/cart/${store.getState().reducer.userName}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    ).json();

    if (getResponse) {
      if (getResponse.gamesList) this.props.setCart(getResponse.gamesList);
    }
  }

  render() {
    return (
      <StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <HeaderContainer />
          <Switch>
            <ProtectedRoute path={`${routesMap.PRODUCTS}/:platform`}>
              <Products />
            </ProtectedRoute>
            <ProtectedRoute path={routesMap.CART}>
              <CartPage />
            </ProtectedRoute>
            <ProtectedRoute path={routesMap.ABOUT}>
              <About />
            </ProtectedRoute>
            <ProtectedRoute path={routesMap.PROFILE}>
              <Profile />
            </ProtectedRoute>
            <Route path={["/", routesMap.HOME]} render={() => <Home />} />
          </Switch>
          <Footer />
          <ModalBodyContainer />
          <>
            {store.getState().reducer.isLoading ? (
              <div className="loading-icon">
                <FontAwesomeIcon icon={faSpinner} className="loading__loading-icon" />
              </div>
            ) : null}
          </>
        </Suspense>
      </StrictMode>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
