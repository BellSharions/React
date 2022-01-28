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
    state.filter.sort,
    state.filter.age,
    state.filter.genre,
    state.filter.sortDir,
    state.filter.term,
  ]);
  return <Products platform={platform} sort={sort} age={age} genre={genre} sortDir={sortDir} search={search} />;
};

export default memo(ProductsContainer);
