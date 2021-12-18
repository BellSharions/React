import Categories from "./categories/categories";
import SearchBar from "../searchBar/searchBar";
import NewGames from "./newGames/newGames";
import "./home.scss";

const Home: React.FC = () => (
  <div className="homePage__container">
    <div className="homePage__search-container">
      <SearchBar platform="" />
    </div>
    <Categories />
    <NewGames />
  </div>
);

export default Home;
