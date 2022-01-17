import { FC } from "react";
import { ProductParams } from "../../types/types";
import SearchBar from "../searchBar/searchBarContainer";
import "./products.scss";

const Products: FC<ProductParams> = ({ platform }) => (
  <div className="productsPage__container">
    <SearchBar platform={platform} />
  </div>
);

export default Products;
