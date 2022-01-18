import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./appContainer";
import store from "./components/redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer props="" />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
