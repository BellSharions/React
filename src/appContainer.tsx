import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Products from "./components/products/productsContainer";
import About from "./components/about/about";
import { routesMap } from "./constants/constants";
import ErrorCase from "./components/errorHandler/errorTest";
import ErrorBoundary from "./components/errorHandler/errorBoundary";
import { AppProps, AppState } from "./types/types";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import Profile from "./components/users/profile";
import store from "./components/redux/store";
import Modal from "./components/modal/modal";
import SignInModalBody from "./components/modal/signInModalBodyContainer";
import SignUpModalBody from "./components/modal/signUpModalBodyContainer";
import { ReducerState } from "./components/redux/reducer";
import HeaderContainer from "./components/header/headerContainer";

const mapStateToProps = (state: ReducerState) => ({
  signInModalVisible: state.signInModalVisible,
  signUpModalVisible: state.signUpModalVisible,
  userName: state.userName,
  loggedIn: state.loggedIn,
});
class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

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
            {store.getState().signInModalVisible ? (
              <Modal>
                <SignInModalBody />
              </Modal>
            ) : null}
            {store.getState().signUpModalVisible ? (
              <Modal>
                <SignUpModalBody />
              </Modal>
            ) : null}
          </>
        </ErrorBoundary>
      </StrictMode>
    );
  }
}

export default connect(mapStateToProps)(AppContainer);
