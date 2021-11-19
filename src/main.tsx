import "./styles/main.css";
import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { StrictMode } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import Home from "./components/home/home";
import SignIn from "./components/users/sign-in";
import SignUp from "./components/users/sign-up";
import Products from "./components/products/products";
import About from "./components/about/about";

const AppContainer: React.FC = () => (
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path={["/", "/home"]} render={() => <Home />} />
        <Route path="/sign-in" render={() => <SignIn />} />
        <Route path="/sign-up" render={() => <SignUp />} />
        <Route path="/products" render={() => <Products />} />
        <Route path="/about" render={() => <About />} />
      </Switch>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);

ReactDom.render(<AppContainer />, document.getElementById("app"));
