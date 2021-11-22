import "./styles/main.css";
import "./styles/main.scss";
import { StrictMode, Component, ErrorInfo } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home/home";
import SignIn from "./components/users/sign-in";
import SignUp from "./components/users/sign-up";
import Products from "./components/products/products";
import About from "./components/about/about";
import { HOME, ABOUT, SIGNIN, SIGNUP, PRODUCTS } from "./constants/constants";

interface ErrorBoundaryProps {
  children?: React.ReactElement[];
}
interface ErrorBoundaryState {
  errorState: boolean;
}

class AppContainer extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  ["constructor"]: typeof AppContainer;

  constructor(props: ErrorBoundaryProps | Readonly<ErrorBoundaryProps>) {
    super(props);
    this.state = { errorState: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    alert("It seems you've caused an error! Click OK to redirect to home page.");
    console.error(errorInfo);
    console.error(error);
    window.location.replace(HOME);
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { errorState: true };
  }

  render() {
    if (this.state.errorState) {
      return <h1>This UI shows if you have caused an error!</h1>;
    }
    return (
      <StrictMode>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path={SIGNIN} render={() => <SignIn />} />
            <Route path={SIGNUP} render={() => <SignUp />} />
            <Route path={PRODUCTS} render={() => <Products />} />
            <Route path={ABOUT} render={() => <About />} />
            <Route path={["/", HOME]} render={() => <Home />} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer />, document.getElementById("app"));
