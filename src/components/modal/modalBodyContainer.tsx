import apiCall from "@/apiCall";
import {
  ageOptions,
  availableGenres,
  buyUrl,
  CallType,
  passwdChangeUrl,
  productUrl,
  RoutesMap,
  signInUrl,
  signUpUrl,
  userCartUrl,
} from "@/constants";
import { CartResponse, GameCart } from "@/types";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { closeModalAction, logInAction, setRoleAction, showDeleteGameModalAction } from "../redux/actions";
import { buyGamesAction, setCartGamesAction } from "../redux/cart/cartActions";
import { fetchGamesAction } from "../redux/filter/filterActions";
import { ReducerState } from "../redux/reducer";
import BuyModalBody from "./buyModalBody";
import "./buyModalBody.scss";
import DeleteGameModal from "./deleteGameModal";
import EditGameModal from "./gameModal";
import Modal from "./modal";
import ChangePassModalBody from "./passwordModalBody";
import SignInModalBody from "./signInModalBody";
import SignUpModal from "./signUpModalBody";

const ModalBodyContainer: FC = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [repeatNewPassword, setRepeatNewPassword] = useState<string>("");
  const [passMessage, setPassMessage] = useState("Please enter new password");
  const [repeatPassMessage, setRepeatPassMessage] = useState("Please enter password");
  const [formValid, setFormValid] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [message, setMessage] = useState("Please enter password");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const gameToEdit = useSelector((state: ReducerState) => state.admin.gametoEdit);
  const incomGenreArr = gameToEdit.genre ? gameToEdit.genre.split(", ") : availableGenres;
  const [titleInp, setTitleInp] = useState<string>("");
  const [categoryInp, setCategoryInp] = useState(incomGenreArr[0]);
  const [priceInp, setPriceInp] = useState<number>(0.99);
  const [imgUrlInp, setImgUrlInp] = useState<string>("");
  const [descriptionInp, setDescriptionInp] = useState<string>("");
  const [ageInp, setAgeInp] = useState<number>(+ageOptions[0]);
  const [pcCheckedInp, setPcCheckedInp] = useState<boolean>(!gameToEdit.category.includes("PC"));
  const [psCheckedInp, setPsCheckedInp] = useState<boolean>(!gameToEdit.category.includes("PlayStation"));
  const [xbxCheckedInp, setXbxCheckedInp] = useState<boolean>(!gameToEdit.category.includes("XBOX"));
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, cartGames, totalPurchase] = useSelector((state: ReducerState) => [
    state.reducer.userName,
    state.cart.gamesList,
    state.cart.totalPurchase,
  ]);
  const [sort, age, genre, sortDir, search] = useSelector((state: ReducerState) => [
    state.filter.sort,
    state.filter.age,
    state.filter.genre,
    state.filter.sortDir,
    state.filter.term,
  ]);
  const [signup, signin, changePassword, buy, edit, add, del] = useSelector((state: ReducerState) => [
    state.reducer.signUpModalVisible,
    state.reducer.signInModalVisible,
    state.reducer.changePassModalVisible,
    state.reducer.buyModalVisible,
    state.reducer.editGameModalVisible,
    state.reducer.addGameModalVisible,
    state.reducer.deleteGameModalVisible,
  ]);

  const finalCategory = [pcCheckedInp ? "PC" : null, psCheckedInp ? "PlayStation" : null, xbxCheckedInp ? "XBOX" : null]
    .filter((categor) => Boolean(categor))
    .join(", ");
  const visible = !!edit;

  const gameObj = {
    id: gameToEdit.id,
    title: titleInp,
    logo: imgUrlInp,
    price: Number(priceInp),
    description: descriptionInp,
    age: Number(ageInp),
    genres: categoryInp,
    category: finalCategory,
    deleted: false,
    rating: "3",
  };

  const searchParams = new URLSearchParams({
    text: search,
    platform: "all games",
    age,
    sort,
    sortDir,
    genre,
  } as Record<string, string>);

  const onTitleChanged = (nameData: string | number) => {
    setTitleInp(nameData as string);
  };

  const onPriceChanged = (priceData: number | string) => {
    if (Number(priceData as number) <= 0.01 && Number(priceData as number) > 999) {
      return;
    }
    const num = Number(Math.round((priceData as number) * 100) / 100);
    setPriceInp(num);
  };

  const onImgUrlChanged = (imgUrlData: string | number) => {
    setImgUrlInp(imgUrlData as string);
  };

  const onDescriptionChanged = (inputName: string) => {
    setDescriptionInp(inputName);
  };

  const pcCheckHandler = () => {
    setPcCheckedInp(!pcCheckedInp);
  };

  const psCheckHandler = () => {
    setPsCheckedInp(!psCheckedInp);
  };

  const xbxCheckHandler = () => {
    setXbxCheckedInp(!xbxCheckedInp);
  };

  const setCategory = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryInp(e.target.value);
  };

  const setAge = (e: ChangeEvent<HTMLInputElement>) => {
    setAgeInp(Number(e.target.value));
  };

  const onNewPasswordChanged = (passwordData: string) => {
    setNewPassword(passwordData);
  };
  const onRepeatNewPasswordChanged = (passwordData: string) => {
    setRepeatNewPassword(passwordData);
  };
  const onRepeatPasswordChanged = (passwordData: string) => {
    setRepeatPassword(passwordData);
  };
  const onLoginChanged = (loginData: string) => {
    setLogin(loginData);
  };

  const onMessageChanged = (messageData: string) => {
    setMessage(messageData);
  };

  const onPasswordChanged = (passwordData: string) => {
    setPassword(passwordData);
  };

  const deleteHandler = () => {
    dispatch(showDeleteGameModalAction());
  };
  const closeModal = () => {
    dispatch(closeModalAction());
  };
  useEffect(() => {
    if (add) {
      setTitleInp("");
      setCategoryInp("");
      setPriceInp(0);
      setImgUrlInp("https://res.cloudinary.com/dev3afzlt/image/upload/v1643294045/300x500_dvgbjh.png");
      setDescriptionInp("");
      setAgeInp(3);
      setPcCheckedInp(false);
      setPsCheckedInp(false);
      setXbxCheckedInp(false);
    } else {
      console.log(gameToEdit);

      setTitleInp(gameToEdit.title);
      setCategoryInp(incomGenreArr[0]);
      setPriceInp(gameToEdit.price);
      setImgUrlInp(gameToEdit.imgUrl);
      setDescriptionInp(gameToEdit.description || "");
      setAgeInp(gameToEdit.age);
      setPcCheckedInp(gameToEdit.category.includes("PC"));
      setPsCheckedInp(gameToEdit.category.includes("PlayStation"));
      setXbxCheckedInp(gameToEdit.category.includes("XBOX"));
    }
  }, [gameToEdit, add]);
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
    e.preventDefault();

    const patchResponse = await apiCall(`${passwdChangeUrl}${userName}`, CallType.PATCH, { repeatNewPassword });
    if (patchResponse.status !== 201) throw new Error(`HTTP status: ${patchResponse.status}`);
    dispatch(closeModalAction());
    return null;
  }

  async function postFunc(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else {
      setMessage(verifyPassword(password).validMessage);
      const res = await apiCall(signInUrl, CallType.POST, { login, password });
      if (res.status === 200) {
        dispatch(logInAction(login));
        localStorage.setItem("login", login);
        if (history.location.state !== null) history.push(history.location.state);
        closeModal();
      } else {
        setMessage("An error has appeared! Check your credentials and try again.");
        throw new Error(`HTTP status: ${res.status}`);
      }
      const getResponse = await apiCall(`${userCartUrl}${login}`, CallType.GET, null);

      if (getResponse.status === 200) {
        dispatch(setCartGamesAction((getResponse.data as CartResponse).gamesList));
      }
      dispatch(setRoleAction(res.data.role));
      localStorage.setItem("role", res.data.role);
    }
    return null;
  }

  async function putFunc(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!(repeatPassword === password)) {
      setMessage("Password is not correct");
    } else if (!verifyPassword(password).isValid) {
      setMessage(verifyPassword(password).validMessage);
    } else if (login.length > 30 || login.length < 3) {
      setMessage("Please use name shorter than 30 characters or longer than 3 characters");
    } else {
      setMessage(verifyPassword(password).validMessage);
      const res = await apiCall(signUpUrl, CallType.POST, { login, password, role: "user" });

      if (res.status === 201) {
        dispatch(logInAction(login));
        dispatch(setRoleAction("user"));
        localStorage.setItem("login", login);
        dispatch(closeModalAction());
        const getResponse = await apiCall(`${userCartUrl}${login}`, CallType.GET, null);

        if (getResponse.status === 200) {
          dispatch(setCartGamesAction((getResponse.data as CartResponse).gamesList));
        }
        history.push(RoutesMap.PROFILE);
      } else {
        setMessage("This login is already in use, please use another one");
        throw new Error(`HTTP status: ${res.status}`);
      }
    }
    return null;
  }
  const confirmHandler = async () => {
    const postResponse = await apiCall(buyUrl, CallType.POST, { userName, cartGames, totalPurchase });
    if (postResponse.status === 404) throw new Error(`HTTP status: ${postResponse.status}`);
    dispatch(buyGamesAction(totalPurchase as number));

    dispatch(closeModalAction());
  };
  const submitHandlerEdit = async () => {
    const putResponse = await apiCall(productUrl, CallType.PUT, gameObj);
    if (putResponse.status === 200) {
      dispatch(fetchGamesAction(`${searchParams}`));
      dispatch(closeModalAction());
    }
  };

  const submitHandlerCreate = async () => {
    const postResponse = await apiCall(productUrl, CallType.POST, gameObj);
    if (postResponse.status === 200) {
      dispatch(fetchGamesAction(`${searchParams}`));
      dispatch(closeModalAction());
    }
  };
  const deleteGame = async () => {
    const deleteResponse = await apiCall(productUrl + gameObj.id, CallType.DELETE, null);
    if (deleteResponse.status === 200) {
      dispatch(fetchGamesAction(`${searchParams}`));
      dispatch(closeModalAction());
    }
  };

  return (
    <>
      {buy ? (
        <Modal>
          <BuyModalBody
            userName={userName as string}
            cartGames={cartGames as GameCart[]}
            amount={totalPurchase as number}
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
            passwordChanged={onNewPasswordChanged}
            newPassword={newPassword}
            passMessage={passMessage}
            repeatPasswordChanged={onRepeatNewPasswordChanged}
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
            loginChanged={onLoginChanged}
            postFunc={postFunc}
            passwordChanged={onPasswordChanged}
            messageChanged={onMessageChanged}
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
            logupChanged={onLoginChanged}
            putFunc={putFunc}
            passwordChanged={onPasswordChanged}
            logup={login}
            password={password}
            message={message}
            verifyPassword={verifyPassword}
            repeatPassword={repeatPassword}
            repeatPasswordChanged={onRepeatPasswordChanged}
          />
        </Modal>
      ) : null}
      {edit || add ? (
        <Modal>
          <EditGameModal
            closeHandler={closeModal}
            gameToEdit={gameToEdit}
            imgUrlInp={imgUrlInp}
            titleInp={titleInp}
            onTitleChanged={onTitleChanged}
            categoryInp={categoryInp}
            setCategory={setCategory}
            onPriceChanged={onPriceChanged}
            priceInp={priceInp}
            onImgUrlChanged={onImgUrlChanged}
            onDescriptionChanged={onDescriptionChanged}
            descriptionInp={descriptionInp}
            ageInp={ageInp}
            setAge={setAge}
            pcCheckedInp={pcCheckedInp}
            pcCheckHandler={pcCheckHandler}
            psCheckedInp={psCheckedInp}
            psCheckHandler={psCheckHandler}
            xbxCheckedInp={xbxCheckedInp}
            xbxCheckHandler={xbxCheckHandler}
            formValid={formValid}
            submitHandlerEdit={submitHandlerEdit}
            submitHandlerCreate={submitHandlerCreate}
            deleteHandler={deleteHandler}
            visible={visible}
          />
        </Modal>
      ) : null}
      {del ? (
        <Modal>
          <DeleteGameModal closeHandler={closeModal} deleteHandler={deleteGame} />
        </Modal>
      ) : null}
    </>
  );
};

export default ModalBodyContainer;
