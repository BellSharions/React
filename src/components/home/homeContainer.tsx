import { FC } from "react";
import "./home.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./home";
import { ReducerState } from "../redux/reducer";

const HomeContainer: FC = () => {
  const plat = useLocation();
  const searchPlat = plat.pathname.split("/")[2];
  const [sort, age, genre, sortDir, search] = useSelector((state: ReducerState) => [
    state.filter.sort,
    state.filter.age,
    state.filter.genre,
    state.filter.sortDir,
    state.filter.term,
  ]);
  return <Home platform={searchPlat} sort={sort} age={age} genre={genre} sortDir={sortDir} search={search} />;
};

export default HomeContainer;
