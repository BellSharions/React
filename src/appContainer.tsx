import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component, Dispatch } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
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

const mapStateToProps = (state: ReducerState) => ({
  signInModalVisible: state.signInModalVisible,
  signUpModalVisible: state.signUpModalVisible,
  changePassModalVisible: state.changePassModalVisible,
  userName: state.userName,
  loggedIn: state.loggedIn,
  age: state.age,
  sort: state.sort,
  sortDir: state.sortDir,
  genre: state.genre,
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
            {store.getState().signInModalVisible && !store.getState().loggedIn ? (
              <Modal>
                <SignInModalBody />
              </Modal>
            ) : null}
            {store.getState().signUpModalVisible && !store.getState().loggedIn ? (
              <Modal>
                <SignUpModalBody />
              </Modal>
            ) : null}
            {store.getState().changePassModalVisible ? (
              <Modal>
                <ChangePassModalBodyContainer />
              </Modal>
            ) : null}
          </>
        </ErrorBoundary>
      </StrictMode>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
