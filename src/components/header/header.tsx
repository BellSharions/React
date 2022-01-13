import { FC } from "react";
import "./header.scss";
import { useSelector } from "react-redux";
import HeaderComponent from "./headerComponent";

const Header: FC = () => {
  const [name, loggedIn] = useSelector((state) => [state.userName, state.loggedIn]);
  return <HeaderComponent userName={name} loggedIn={loggedIn} />;
};

export default Header;
