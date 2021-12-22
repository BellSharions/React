import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home/home";
import Products from "./components/products/products";
import About from "./components/about/about";
import { HOME, ABOUT, PRODUCTS, ERROR, PROFILE } from "./constants/constants";
import ErrorCase from "./components/errorHandler/errorTest";
import ErrorBoundary from "./components/errorHandler/errorBoundary";
import { LoggedInProvider, UserNameProvider } from "./context";
import { AppProps, AppState } from "./types/types";
import ProtectedRoute from "./components/protectedRoute";
import LogInPage from "./components/users/logIn";
import Profile from "./components/users/profile";

class AppContainer extends Component<AppProps, AppState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: AppProps) {
    super(props);
    this.state = { loggedIn: false, userName: "", showSignInModal: false, showSignUpModal: false };
  }

  logInFunc = (status: boolean, name: string) => {
    this.setState({ loggedIn: status, userName: name });
  };

  logOutFunc = () => {
    this.setState({ loggedIn: false });
  };

  showSignUpModalFunc = () => {
    this.setState({ showSignUpModal: true });
  };

  showSignInModalFunc = () => {
    this.setState({ showSignInModal: true });
  };

  closeModalFunc = () => {
    this.setState({ showSignInModal: false, showSignUpModal: false });
  };

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <ErrorBoundary>
            <LoggedInProvider value={this.state.loggedIn}>
              <UserNameProvider value={this.state.userName}>
                <Header
                  logInFunc={this.logInFunc}
                  logOutFunc={this.logOutFunc}
                  showSignUpModalFunc={this.showSignUpModalFunc}
                  showSignInModalFunc={this.showSignInModalFunc}
                  closeModalFunc={this.closeModalFunc}
                  showSignUpModal={this.state.showSignUpModal}
                  showSignInModal={this.state.showSignInModal}
                />
              </UserNameProvider>
            </LoggedInProvider>
            <Switch>
              <Route path="/login">
                <LogInPage
                  logInFunc={this.logInFunc}
                  closeModalFunc={this.closeModalFunc}
                  showSignInModalFunc={this.showSignInModalFunc}
                  logInState={this.state.loggedIn}
                  showSignInModal={this.state.showSignInModal}
                />
              </Route>
              <ProtectedRoute loggedIn={this.state.loggedIn} logInFunc={this.logInFunc} path={`${PRODUCTS}/:platform`}>
                <Products key={this.props.platform} />
              </ProtectedRoute>
              <ProtectedRoute loggedIn={this.state.loggedIn} logInFunc={this.logInFunc} path={ABOUT}>
                <About />
              </ProtectedRoute>
              <ProtectedRoute loggedIn={this.state.loggedIn} logInFunc={this.logInFunc} path={PROFILE}>
                <Profile />
              </ProtectedRoute>
              <Route path={ERROR} render={() => <ErrorCase />} />
              <Route path={["/", HOME]} render={() => <Home />} />
            </Switch>
            <Footer />
          </ErrorBoundary>
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer props="" />, document.getElementById("app"));
