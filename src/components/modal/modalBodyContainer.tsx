import { signInUrl, signUpUrl } from "@/constants/constants";
import { GameCart } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeModalAction, logInAction } from "../redux/actions";
import { buyGamesAction, setCartGamesAction } from "../redux/cart/cartActions";
import { ReducerState } from "../redux/reducer";
import BuyModalBody from "./buyModalBody";
import "./buyModalBody.scss";
import Modal from "./modal";
import ChangePassModalBody from "./passwordModalBody";
import SignInModalBody from "./signInModalBody";
import SignUpModal from "./signUpModalBody";

const ModalBodyContainer: FC = () => {
  const [userName, cartGames, totalPurchase] = useSelector((state: ReducerState) => [
    state.reducer.userName,
    state.cart.gamesList,
    state.cart.totalPurchase,
  ]);
  const [signup, signin, changePassword, buy] = useSelector((state: ReducerState) => [
    state.reducer.signUpModalVisible,
    state.reducer.signInModalVisible,
    state.reducer.changePassModalVisible,
    state.reducer.buyModalVisible,
  ]);
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [passMessage, setPassMessage] = useState("Please enter new password");
  const [repeatPassMessage, setRepeatPassMessage] = useState("Please enter password");
  const [formValid, setFormValid] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter password");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const newPasswordGetter = (passwordData: string) => {
    setNewPassword(passwordData);
  };
  const confirmHandler = async () => {
    const postResponse = await fetch(`http://localhost:8080/api/buy/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, cartGames, totalPurchase }),
    });
    if (postResponse.status === 404) throw new Error(`HTTP status: ${postResponse.status}`);
    dispatch(buyGamesAction(totalPurchase));

    dispatch(closeModalAction());
  };
  const repeatNewPasswordGetter = (passwordData: string) => {
    setRepeatNewPassword(passwordData);
  };
  const repeatPasswordGetter = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };
  const closeModal = () => {
    dispatch(closeModalAction());
  };
  const loginGetter = (loginData: string) => {
    setLogin(loginData);
  };

  const messageGetter = (messageData: string) => {
    setMessage(messageData);
  };

  const passwordGetter = (passwordData: string) => {
    setPassword(passwordData);
  };
  useEffect(() => {
    const alphNumPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!newPassword) setPassMessage("Please enter password");
    else if (newPassword.length < 8 || newPassword.length > 15)
      setPassMessage("Password must be between 8 and 15 characters");
    else if (newPassword[0].toUpperCase() !== newPassword[0])
      setPassMessage("First character of password must be capital");
    else if (!alphNumPass.test(newPassword))
      setPassMessage("At least 1 character of password must be numeric or alphabetic");
    else setPassMessage("New password is OK");
    if (newPassword !== repeatNewPassword || !repeatNewPassword)
      setRepeatPassMessage("Repeated password in not correct");
    else setRepeatPassMessage("Repeated password is OK");
  }, [newPassword, repeatNewPassword]);

  useEffect(() => {
    if (passMessage === "New password is OK" && repeatPassMessage === "Repeated password is OK") setFormValid(true);
    else setFormValid(false);
  }, [passMessage, repeatPassMessage]);
  useEffect(() => {
    setPassword("");
    setLogin("");
    setRepeatPassword("");
    setMessage("Please enter password");
  }, [signup, signin, changePassword, buy]);

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

  async function changeFunc(e: React.SyntheticEvent) {
    if (e) e.preventDefault();
    const patchResponse = await fetch(`http://localhost:8080/passwordChange/${userName}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repeatNewPassword }),
    });
    if (patchResponse.status === 404) throw new Error(`HTTP status: ${patchResponse.status}`);
    dispatch(closeModalAction());
    return null;
  }

  async function postFunc(e: React.SyntheticEvent) {
    if (e) e.preventDefault();

    if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else {
      setMessage(verifyPassword(password).validMessage);
      const res = await fetch(signInUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (res.status === 200) {
        dispatch(logInAction(login));
        localStorage.setItem("login", login);
        if (history.location.state !== null) history.push(history.location.state);
        closeModal();
      } else {
        setMessage("An error has appeared! Check your credentials and try again.");
        throw new Error(`HTTP status: ${res.status}`);
      }
      const getResponse = await (
        await fetch(`http://localhost:8080/api/getCart/${login}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
      ).json();
      console.log(getResponse.gamesList);
      if (getResponse.gamesList) dispatch(setCartGamesAction(getResponse.gamesList));
      else dispatch(setCartGamesAction([] as GameCart[]));
      const response = await res.json();
      return response;
    }
    return null;
  }

  async function putFunc(e: React.SyntheticEvent) {
    if (e) e.preventDefault();

    if (!(repeatPassword === password)) {
      setMessage("Password is not correct");
    } else if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else if (login.length > 30 || login.length < 3) {
      setMessage("Please use name shorter than 30 characters or longer than 3 characters");
    } else {
      setMessage(verifyPassword(password).validMessage);
      const res = await fetch(signUpUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      if (res.status === 201) {
        dispatch(logInAction(login));
        localStorage.setItem("login", login);
        dispatch(closeModalAction());
        const getResponse = await (
          await fetch(`http://localhost:8080/api/getCart/${login}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
        ).json();
        console.log(getResponse.gamesList);
        if (getResponse) dispatch(setCartGamesAction(getResponse.gamesList));
        else dispatch(setCartGamesAction([] as GameCart[]));
        history.push("/profile");
      } else {
        setMessage("This login is already in use, please use another one");
        throw new Error(`HTTP status: ${res.status}`);
      }

      const response = await res.json();
      return response;
    }
    return null;
  }
  return (
    <>
      {buy ? (
        <Modal>
          <BuyModalBody
            userName={userName}
            cartGames={cartGames}
            amount={totalPurchase}
            closeHandler={closeModal}
            confirmHandler={confirmHandler}
          />
        </Modal>
      ) : null}
      {changePassword ? (
        <Modal>
          <ChangePassModalBody
            closeModal={closeModal}
            changeFunc={changeFunc}
            passwordGetter={newPasswordGetter}
            newPassword={newPassword}
            passMessage={passMessage}
            repeatPasswordGetter={repeatNewPasswordGetter}
            repeatNewPassword={repeatNewPassword}
            repeatPassMessage={repeatPassMessage}
            formValid={formValid}
          />
        </Modal>
      ) : null}
      {signin ? (
        <Modal>
          <SignInModalBody
            closeModal={closeModal}
            loginGetter={loginGetter}
            postFunc={postFunc}
            passwordGetter={passwordGetter}
            messageGetter={messageGetter}
            login={login}
            password={password}
            message={message}
            verifyPassword={verifyPassword}
          />
        </Modal>
      ) : null}
      {signup ? (
        <Modal>
          <SignUpModal
            closeModal={closeModal}
            logupGetter={loginGetter}
            putFunc={putFunc}
            passwordGetter={passwordGetter}
            logup={login}
            password={password}
            message={message}
            verifyPassword={verifyPassword}
            repeatPassword={repeatPassword}
            repeatPasswordGetter={repeatPasswordGetter}
          />
        </Modal>
      ) : null}
    </>
  );
};

export default ModalBodyContainer;
