import { FC, useState } from "react";
import "./signinmodalbody.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import InputText from "./inputText";
import { SignInModalBodyProps } from "../../types/types";
import { signInUrl } from "../../constants/constants";

const SignInModalBody: FC<SignInModalBodyProps> = ({ logInFunc, closeModalFunc }) => {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter password");
  const loginGetter = (loginData: string) => {
    setLogin(loginData);
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
        logInFunc(true, login);
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
    <div className="signIn__modal_container">
      <div className="signIn__modal_upper-container">
        <h1 className="signIn__modal_title">Authorization</h1>
        <button className="signIn__modal_close-btn" type="button" onClick={closeModalFunc}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form action="#" className="signIn__modal_content-container" onSubmit={postFunc}>
        <span>{message}</span>
        <InputText name="Login" id="SignInLogin" type="text" onChange={loginGetter} value={login} />
        <InputText name="Password" id="SignInPassword" type="password" onChange={passwordGetter} value={password} />
        <div className="signIn__modal_submit-btn-container">
          <input className="signIn__modal_submit-btn" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignInModalBody;
