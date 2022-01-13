import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import "./signinmodalbody.scss";
import { useHistory } from "react-router-dom";
import { signInUrl } from "../../constants/constants";
import { closeModalAction, logInAction } from "../redux/actions";
import SignInModalBodyComponent from "./signInModalBodyComponent";

const SignInModalBody: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter password");
  const dispatch = useDispatch();
  const history = useHistory();

  const loginGetter = (loginData: string) => {
    setLogin(loginData);
  };

  const messageGetter = (messageData: string) => {
    setMessage(messageData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };

  const signInObj = { login, password };

  const verifyPassword = (pass: string) => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!pass) {
      return { isValid: false, validMessage: "Please enter password" };
    }
    if (pass.length < 8 || pass.length > 15) {
      return { isValid: false, validMessage: "Password must be between 8 and 15 characters" };
    }
    if (pass[0].toUpperCase() !== pass[0]) {
      return { isValid: false, validMessage: "First character of password must be capital" };
    }
    if (!alphNumPass.test(pass)) {
      return { isValid: false, validMessage: "At least 1 character of password must be numeric or alphabetic" };
    }
    return { isValid: true, validMessage: "Password is valid. Please wait for verification." };
  };

  async function postFunc(e: React.SyntheticEvent) {
    if (e) {
      e.preventDefault();
    }

    if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else {
      setMessage(verifyPassword(password).validMessage);
      console.log(signInObj);
      const res = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInObj),
      });

      if (res.status === 200) {
        dispatch(logInAction(login));
        console.log(history);
        history.push(history.location.state);
        dispatch(closeModalAction());
      } else {
        setMessage("An error has appeared! Check your credentials and try again.");
        throw new Error(`HTTP status: ${res.status}`);
      }

      const response = await res.json();
      return response;
    }
    return null;
  }

  return (
    <SignInModalBodyComponent
      dispatch={dispatch}
      loginGetter={loginGetter}
      postFunc={postFunc}
      passwordGetter={passwordGetter}
      messageGetter={messageGetter}
      login={login}
      password={password}
      message={message}
      verifyPassword={verifyPassword}
    />
  );
};

export default SignInModalBody;
