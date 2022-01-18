import Categories from "./categories/categories";
import SearchBarContainer from "../searchBar/searchBarContainer";
import NewGames from "./newGames/newGames";
import "./home.scss";

const Home: React.FC = () => (
  <div className="homePage__container">
    <div className="homePage__search-container">
      <SearchBarContainer platform="" />
    </div>
    <Categories />
    <NewGames />
  </div>
);

export default Home;
