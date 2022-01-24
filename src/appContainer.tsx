import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component, Dispatch } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./components/footer/footer";
import Home from "./components/home/homeContainer";
import Products from "./components/products/productsContainer";
import About from "./components/about/about";
import { routesMap } from "./constants/constants";
import ErrorCase from "./components/errorHandler/errorTest";
import ErrorBoundary from "./components/errorHandler/errorBoundary";
import { AppProps, AppState } from "./types/types";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Profile from "./components/users/profileContainer";
import store from "./components/redux/store";
import Modal from "./components/modal/modal";
import SignInModalBody from "./components/modal/signInModalBodyContainer";
import SignUpModalBody from "./components/modal/signUpModalBodyContainer";
import { ReducerState } from "./components/redux/reducer";
import HeaderContainer from "./components/header/headerContainer";
import ChangePassModalBodyContainer from "./components/modal/passwordModalBodyContainer";
import { logInAction } from "./components/redux/actions";
import CartPage from "./components/cart/cartPageContainer";
import BuyModalBody from "./components/modal/buyModalBody";

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
    payload: string;
  }>
) => ({
  getLogin: (value: string) => dispatch(logInAction(value)),
});
class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    if (localStorage && localStorage.getItem("login")) this.props.getLogin(localStorage.getItem("login"));
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
  }

  render() {
    return (
      <StrictMode>
        <ErrorBoundary>
          <HeaderContainer />
          <Switch>
            <ProtectedRoute path={`${routesMap.PRODUCTS}/:platform`}>
              <Products />
            </ProtectedRoute>
            <ProtectedRoute path="/cart">
              <CartPage />
            </ProtectedRoute>
            <ProtectedRoute path={routesMap.ABOUT}>
              <About />
            </ProtectedRoute>
            <ProtectedRoute path={routesMap.PROFILE}>
              <Profile />
            </ProtectedRoute>
            <Route path={routesMap.ERROR} render={() => <ErrorCase />} />
            <Route path={["/", routesMap.HOME]} render={() => <Home />} />
          </Switch>
          <Footer />
          <>
            {store.getState().reducer.signInModalVisible && !store.getState().reducer.loggedIn ? (
              <Modal>
                <SignInModalBody />
              </Modal>
            ) : null}
            {store.getState().reducer.signUpModalVisible && !store.getState().reducer.loggedIn ? (
              <Modal>
                <SignUpModalBody />
              </Modal>
            ) : null}
            {store.getState().reducer.changePassModalVisible ? (
              <Modal>
                <ChangePassModalBodyContainer />
              </Modal>
            ) : null}
            {store.getState().reducer.buyModalVisible ? (
              <Modal>
                <BuyModalBody />
              </Modal>
            ) : null}
            {store.getState().reducer.isLoading ? (
              <div className="loading-icon">
                <FontAwesomeIcon icon={faSpinner} className="loading__loading-icon" />
              </div>
            ) : null}
          </>
        </ErrorBoundary>
      </StrictMode>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
