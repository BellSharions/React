import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./products.scss";
import Products from "./products";
import { ReducerState } from "../redux/reducer";

const ProductsContainer: React.FC = () => {
  const plat = useLocation();
  const search = plat.pathname.split("/")[2];
  const [sort, age, genre, sortDir] = useSelector((state: ReducerState) => [
    state.reducer.sort,
    state.reducer.age,
    state.reducer.genre,
    state.reducer.sortDir,
  ]);
  return <Products platform={search} sort={sort} age={age} genre={genre} sortDir={sortDir} />;
};

export default ProductsContainer;
