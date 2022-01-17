import { FC } from "react";
import "./header.scss";
import { useSelector } from "react-redux";
import Header from "./header";

const HeaderContainer: FC = () => {
  const [name, loggedIn] = useSelector((state) => [state.userName, state.loggedIn]);
  return <Header userName={name} loggedIn={loggedIn} />;
};

export default HeaderContainer;
