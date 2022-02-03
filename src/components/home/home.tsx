import { FC } from "react";
import { BaseSearchCriteria } from "@/types";
import Categories from "./categories/categories";
import SearchBarContainer from "../searchBar/searchBarContainer";
import NewGames from "./new-games/newGames";
import "./home.scss";

export interface HomeProps extends BaseSearchCriteria {
  search: string;
}

const Home: FC<HomeProps> = (props) => (
  <div className="homePage__container">
    <div className="homePage__search-container">
      <SearchBarContainer {...props} />
    </div>
    <Categories />
    <NewGames />
  </div>
);

export default Home;
