import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./products.scss";
import { memo } from "react";
import Products from "./products";
import { ReducerState } from "../redux/reducer";

const ProductsContainer: React.FC = () => {
  const plat = useLocation();
  const platform = plat.pathname.split("/")[2];
  const [sort, age, genre, sortDir, search] = useSelector((state: ReducerState) => [
    state.reducer.sort,
    state.reducer.age,
    state.reducer.genre,
    state.reducer.sortDir,
    state.reducer.term,
  ]);
  return <Products platform={platform} sort={sort} age={age} genre={genre} sortDir={sortDir} search={search} />;
};

export default memo(ProductsContainer);
