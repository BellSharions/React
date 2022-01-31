import { FC, memo } from "react";
import { HomeProps } from "@/types/types";
import Categories from "./categories/categories";
import SearchBarContainer from "../searchBar/searchBarContainer";
import NewGames from "./newGames/newGames";
import "./home.scss";

const Home: FC<HomeProps> = ({ platform, sort, age, genre, sortDir, search }) => (
  <div className="homePage__container">
    <div className="homePage__search-container">
      <SearchBarContainer platform={platform} sort={sort} age={age} genre={genre} sortDir={sortDir} search={search} />
    </div>
    <Categories />
    <NewGames />
  </div>
);

export default memo(Home);
