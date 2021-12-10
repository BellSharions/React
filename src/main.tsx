import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home/home";
import SignIn from "./components/users/sign-in";
import SignUp from "./components/users/sign-up";
import Products from "./components/products/products";
import About from "./components/about/about";
import { HOME, ABOUT, SIGNIN, SIGNUP, PRODUCTS, ERROR } from "./constants/constants";
import ErrorCase from "./components/errorHandler/errorTest";
import ErrorBoundary from "./components/errorHandler/errorBoundary";

class AppContainer extends Component {
  ["constructor"]: typeof AppContainer;

  constructor(props: string) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StrictMode>
        <BrowserRouter>
          <ErrorBoundary>
            <Header />
            <Switch>
              <Route path={SIGNIN} render={() => <SignIn />} />
              <Route path={SIGNUP} render={() => <SignUp />} />
              <Route
                path={`${PRODUCTS}/:platform`}
                render={(props) => <Products key={props.match.params.platform} />}
              />
              <Route path={ABOUT} render={() => <About />} />
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

ReactDom.render(<AppContainer />, document.getElementById("app"));
