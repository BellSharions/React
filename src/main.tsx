import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home/home";
import Products from "./components/products/products";
import About from "./components/about/about";
import { HOME, ABOUT, PRODUCTS, ERROR, PROFILE } from "./constants/constants";
import ErrorCase from "./components/errorHandler/errorTest";
import ErrorBoundary from "./components/errorHandler/errorBoundary";
import { AppProps, AppState } from "./types/types";
import ProtectedRoute from "./components/protectedRoute";
import LogInPage from "./components/users/logIn";
import Profile from "./components/users/profile";
import store from "./components/redux/store";
import ModalContainer from "./components/modal/modalContainer";

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = { loggedIn: false, userName: "", showSignInModal: false, showSignUpModal: false };
  }

  render() {
    return (
      <Provider store={store}>
        <StrictMode>
          <BrowserRouter>
            <ErrorBoundary>
              <Header />
              <Switch>
                <Route path="/login">
                  <LogInPage />
                </Route>
                <ProtectedRoute path={`${PRODUCTS}/:platform`}>
                  <Products />
                </ProtectedRoute>
                <ProtectedRoute path={ABOUT}>
                  <About />
                </ProtectedRoute>
                <ProtectedRoute path={PROFILE}>
                  <Profile />
                </ProtectedRoute>
                <Route path={ERROR} render={() => <ErrorCase />} />
                <Route path={["/", HOME]} render={() => <Home />} />
              </Switch>
              <Footer />
              <ModalContainer />
            </ErrorBoundary>
          </BrowserRouter>
        </StrictMode>
      </Provider>
    );
  }
}

ReactDom.render(<AppContainer props="" />, document.getElementById("app"));
